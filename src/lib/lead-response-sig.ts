import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * HMAC-SHA256 signer + verifier for the firm-side click links embedded in
 * /api/leads firm-notification mails (mig 026 signal-back loop, 2026-05-12).
 *
 * Each accept / decline CTA in the firm mail is signed with
 * LEAD_RESPONSE_SECRET so a firm can't accept-or-decline on behalf of
 * another firm even if they can guess the URL shape. The signature is
 * a 22-character base64url slice of the 32-byte HMAC digest = 128 bits
 * of entropy, brute-force-resistant under any realistic web load while
 * keeping the URL compact.
 *
 * Sig payload is the canonical triple `${leadId}:${supplierId}:${action}`.
 * No timestamp is folded in for MVP — links don't expire. If TTL becomes
 * a requirement, append `:${expEpochSeconds}` to the payload and add
 * an `exp` query param to the URL. The lead_responses.sig_version column
 * lets us rotate the secret later without losing the audit chain.
 */
const SIG_LENGTH = 22

function getSecret(): string {
  const s = process.env.LEAD_RESPONSE_SECRET
  if (!s || s.length < 32) {
    throw new Error('LEAD_RESPONSE_SECRET not configured (or too short — needs >=32 chars)')
  }
  return s
}

export type LeadResponseAction = 'accept' | 'decline'

export function signLeadResponse(
  leadId: string,
  supplierId: string,
  action: LeadResponseAction,
): string {
  const payload = `${leadId}:${supplierId}:${action}`
  const digest = createHmac('sha256', getSecret()).update(payload).digest()
  return digest.toString('base64url').slice(0, SIG_LENGTH)
}

export function verifyLeadResponseSig(
  leadId: string,
  supplierId: string,
  action: string,
  sig: string | null | undefined,
): action is LeadResponseAction {
  if (action !== 'accept' && action !== 'decline') return false
  if (typeof sig !== 'string' || sig.length !== SIG_LENGTH) return false
  let expected: string
  try {
    expected = signLeadResponse(leadId, supplierId, action)
  } catch {
    return false
  }
  const a = Buffer.from(sig, 'utf8')
  const b = Buffer.from(expected, 'utf8')
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
