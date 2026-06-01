import { cookies } from 'next/headers'
import { timingSafeEqual } from 'node:crypto'

// Single shared admin token kept in env (ADMIN_TOKEN). The dashboard is a
// browser-navigated page, so the token rides in an httpOnly cookie rather than
// an Authorization header (the cron-route pattern). Fail-closed: if ADMIN_TOKEN
// is unset, nobody is admin.

export const ADMIN_COOKIE = 'kv_admin'
// 8h session — long enough for a verification sitting, short enough to expire.
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8

export function tokenMatches(candidate: string | undefined | null): boolean {
  const expected = process.env.ADMIN_TOKEN
  if (!expected || !candidate) return false
  const a = Buffer.from(candidate, 'utf8')
  const b = Buffer.from(expected, 'utf8')
  // length check first: timingSafeEqual throws on length mismatch.
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies()
  return tokenMatches(store.get(ADMIN_COOKIE)?.value)
}
