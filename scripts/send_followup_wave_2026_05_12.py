"""
Wersja-B follow-up wave 1 sender.

Modes:
  --dry-run            tabular summary, no mail
  --test               send 1 mail (row 1, Kara→Hercules) to CHRISTOPH_GMAIL
                        instead of company_email — for inbox check before bulk
  --bulk               send all rows with send_after_date == today (or earlier)
                        to real company_email, log to lead_companies.followup_sent_at,
                        then UPDATE leads.status='contacted' for the covered leads

Input:  tmp/followup_emails_2026_05_12.csv (33 rows; this wave filters to 23)
Sender: Christoph Jonetzko <christoph@send.kranvergleich.de>
Reply:  christoph.jonetzko@gmail.com
Throttle: 500ms between sends (2/s, below Resend free-tier 5/s, gives margin)
Headers: X-KV-Lead-Id, X-KV-Company-Id on every mail for future
         auto-reply-detection wiring.
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import httpx
from dotenv import load_dotenv

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env.local")
RESEND_KEY = os.environ["RESEND_API_KEY"]
SUPA = os.environ["NEXT_PUBLIC_SUPABASE_URL"].rstrip("/")
SUPA_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
SH = {"apikey": SUPA_KEY, "Authorization": f"Bearer {SUPA_KEY}",
      "Content-Type": "application/json", "Prefer": "return=representation"}

CSV_PATH = ROOT / "tmp" / "followup_emails_2026_05_12.csv"
LOG_PATH = ROOT / "tmp" / "followup_send_log_2026_05_12.csv"

FROM_EMAIL = "Christoph Jonetzko <christoph@send.kranvergleich.de>"
FROM_FALLBACK = "Christoph Jonetzko <noreply@send.kranvergleich.de>"
REPLY_TO = "christoph.jonetzko@gmail.com"
CHRISTOPH_GMAIL = "christoph.jonetzko@gmail.com"

THROTTLE_S = 0.5  # 2 emails / sec

# Default wave (wave 1, 2026-05-12). Override via --wave-date.
# Wave 2 = 17.05.2026 (Matthias F., 1 firm).
# Wave 3 = 21.05.2026 (Ziegler Frank, 9 firms).
DEFAULT_WAVE_DATE = "12.05.2026"

# Expected wave shapes — sanity guard so the script refuses to send if the
# CSV has been edited or rows have drifted. Refusing is safer than blindly
# sending the wrong batch.
EXPECTED_WAVES = {
    "12.05.2026": {"row_count": 23, "lead_ids": {
        "1db7c1ff-03a2-47b2-8a1c-5da526cffa09",  # Kara
        "1a4660c9-cb36-4642-940c-6c8aaede7be5",  # Mario Wagner
        "0a9cb2fc-8be7-4aac-ad7a-f33fb736c0a3",  # Mathias Petzel
    }},
    "17.05.2026": {"row_count": 1, "lead_ids": {
        "b63eb9ee-24c0-449f-b11f-19007122818a",  # Matthias Falkenberg
    }},
    "21.05.2026": {"row_count": 9, "lead_ids": {
        "357b8abd-b60f-40c8-bea7-b1440e760b3f",  # Ziegler Frank
    }},
}


def load_csv() -> list[dict]:
    with CSV_PATH.open("r", encoding="utf-8", newline="") as fh:
        return list(csv.DictReader(fh))


def wave_rows(rows: list[dict], wave_date: str) -> list[dict]:
    return [r for r in rows if r["send_after_date"] == wave_date]


def resend_send(to_email: str, subject: str, body_text: str, lead_id: str, company_id: str,
                from_email: str = FROM_EMAIL) -> tuple[int, dict]:
    payload = {
        "from": from_email,
        "to": [to_email],
        "reply_to": REPLY_TO,
        "subject": subject,
        "text": body_text,
        "headers": {
            "X-KV-Lead-Id": lead_id,
            "X-KV-Company-Id": company_id,
        },
        "tags": [
            {"name": "type", "value": "followup_wave1"},
            {"name": "lead_id", "value": lead_id},
        ],
    }
    r = httpx.post(
        "https://api.resend.com/emails",
        headers={"Authorization": f"Bearer {RESEND_KEY}", "Content-Type": "application/json"},
        json=payload, timeout=20,
    )
    try:
        body = r.json()
    except Exception:
        body = {"raw": r.text[:300]}
    return r.status_code, body


def dry_run(rows: list[dict], wave_date: str) -> None:
    print("=" * 90)
    print(f"DRY-RUN SUMMARY — wave (send_after_date == {wave_date})")
    print("=" * 90)
    print(f"  Sender FROM      : {FROM_EMAIL}")
    print(f"  Sender FALLBACK  : {FROM_FALLBACK}  (used only if main 422 invalid_from)")
    print(f"  Reply-To         : {REPLY_TO}")
    print(f"  Throttle         : {THROTTLE_S*1000:.0f} ms between sends ({int(1/THROTTLE_S)}/s)")
    print(f"  Custom headers   : X-KV-Lead-Id, X-KV-Company-Id")
    print(f"  Tag (Resend)     : type=followup_wave1, lead_id=<uuid>")
    print()

    n = len(rows)
    by_lead = {}
    by_company = set()
    for r in rows:
        by_lead.setdefault(r["customer_name"], []).append(r)
        by_company.add(r["company_email"].lower())

    print(f"  Mails in wave    : {n}")
    print(f"  Unique recipients: {len(by_company)} company emails")
    print(f"  Per-lead breakdown:")
    for cust, lrows in by_lead.items():
        print(f"    {cust:25s} lead_date={lrows[0]['lead_date_de']}  {len(lrows)} firms")
    print()

    print(f"  Postponed (not in this wave):")
    csv_all = load_csv()
    other = [r for r in csv_all if r["send_after_date"] != wave_date]
    other_by_lead = {}
    for r in other:
        other_by_lead.setdefault(r["customer_name"], []).append(r)
    for cust, lrows in other_by_lead.items():
        print(f"    {cust:25s} send_after={lrows[0]['send_after_date']}  {len(lrows)} firms")

    print()
    print(f"  Source CSV : {CSV_PATH}")
    print(f"  Log target : {LOG_PATH}")
    print(f"  DB log col : lead_companies.followup_sent_at  (mig 024 — must be applied before --bulk)")


def test_send(rows: list[dict]) -> None:
    row = rows[0]  # row_id=1, first Kara row, alphabetically by company_name
    print("=" * 90)
    print("TEST SEND — 1 mail to Christoph's gmail (not real company_email)")
    print("=" * 90)
    print(f"  Original target  : {row['company_name']} <{row['company_email']}>")
    print(f"  Redirected to    : {CHRISTOPH_GMAIL}")
    print(f"  Subject          : {row['subject_de']}")
    print(f"  Headers          : X-KV-Lead-Id={row['lead_id']}")
    print(f"                     X-KV-Company-Id={row['company_id']}")
    print()

    status, body = resend_send(
        to_email=CHRISTOPH_GMAIL,
        subject=row["subject_de"],
        body_text=row["body_de"],
        lead_id=row["lead_id"],
        company_id=row["company_id"],
    )
    if status >= 300:
        # try fallback FROM
        if status == 422 and "from" in json.dumps(body).lower():
            print(f"  PRIMARY FROM failed ({status}): {body}")
            print(f"  Retrying with fallback FROM = {FROM_FALLBACK}")
            status, body = resend_send(
                to_email=CHRISTOPH_GMAIL,
                subject=row["subject_de"],
                body_text=row["body_de"],
                lead_id=row["lead_id"],
                company_id=row["company_id"],
                from_email=FROM_FALLBACK,
            )
        if status >= 300:
            print(f"  FAIL  HTTP {status}")
            print(f"  body : {json.dumps(body, indent=2, ensure_ascii=False)[:500]}")
            sys.exit(1)
    print(f"  OK    HTTP {status}  Resend id={body.get('id')}")
    print()
    print(f"  → Check {CHRISTOPH_GMAIL} inbox. Verify: umlauts, sender display,")
    print(f"    reply-to behaviour, no spurious Resend footer.")
    print(f"  → If looks good, reply with 'send wave' to dispatch the remaining 22 mails.")


def bulk_send(rows: list[dict]) -> None:
    print("=" * 90)
    print(f"BULK SEND — {len(rows)} mails to real company_emails")
    print("=" * 90)

    sent_ok: list[dict] = []
    sent_fail: list[dict] = []

    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    log_fh = LOG_PATH.open("w", encoding="utf-8", newline="")
    log_writer = csv.DictWriter(log_fh, fieldnames=[
        "row_id", "lead_id", "company_id", "company_email", "customer_name",
        "http_status", "resend_id", "error", "sent_at_iso",
    ], quoting=csv.QUOTE_ALL)
    log_writer.writeheader()

    from_email_in_use = FROM_EMAIL

    for i, row in enumerate(rows, 1):
        # Throttle BEFORE each send except the first
        if i > 1:
            time.sleep(THROTTLE_S)

        status, body = resend_send(
            to_email=row["company_email"],
            subject=row["subject_de"],
            body_text=row["body_de"],
            lead_id=row["lead_id"],
            company_id=row["company_id"],
            from_email=from_email_in_use,
        )
        # First-row safety: if PRIMARY from rejected, switch to fallback for remainder
        if i == 1 and status == 422 and "from" in json.dumps(body).lower() and from_email_in_use == FROM_EMAIL:
            print(f"  [{i:02d}] PRIMARY FROM rejected — switching to fallback for whole wave")
            from_email_in_use = FROM_FALLBACK
            status, body = resend_send(
                to_email=row["company_email"],
                subject=row["subject_de"],
                body_text=row["body_de"],
                lead_id=row["lead_id"],
                company_id=row["company_id"],
                from_email=from_email_in_use,
            )

        now_iso = datetime.now(timezone.utc).isoformat()
        if status < 300:
            resend_id = body.get("id", "")
            sent_ok.append({**row, "resend_id": resend_id, "sent_at_iso": now_iso})
            print(f"  [{i:02d}] OK    HTTP {status}  {row['company_email']:35s}  id={resend_id}")
            log_writer.writerow({
                "row_id": row["row_id"], "lead_id": row["lead_id"], "company_id": row["company_id"],
                "company_email": row["company_email"], "customer_name": row["customer_name"],
                "http_status": status, "resend_id": resend_id, "error": "", "sent_at_iso": now_iso,
            })
            # Patch lead_companies.followup_sent_at (mig 024 must be applied)
            patch_url = (f"{SUPA}/rest/v1/lead_companies"
                         f"?lead_id=eq.{row['lead_id']}&company_id=eq.{row['company_id']}")
            patch = httpx.patch(patch_url, headers=SH, json={"followup_sent_at": now_iso}, timeout=20)
            if patch.status_code >= 300:
                print(f"        DB log FAIL HTTP {patch.status_code}: {patch.text[:200]}")
        else:
            err = json.dumps(body, ensure_ascii=False)[:200]
            sent_fail.append({**row, "http_status": status, "error": err})
            print(f"  [{i:02d}] FAIL  HTTP {status}  {row['company_email']:35s}  err={err[:120]}")
            log_writer.writerow({
                "row_id": row["row_id"], "lead_id": row["lead_id"], "company_id": row["company_id"],
                "company_email": row["company_email"], "customer_name": row["customer_name"],
                "http_status": status, "resend_id": "", "error": err, "sent_at_iso": now_iso,
            })

    log_fh.close()

    print()
    print("=" * 90)
    print("REPORT")
    print("=" * 90)
    print(f"  Sent OK : {len(sent_ok)}")
    print(f"  Failed  : {len(sent_fail)}")
    if sent_fail:
        print(f"  Failures:")
        for f in sent_fail:
            print(f"    lead_id={f['lead_id']}  company={f['company_name']}  HTTP {f['http_status']}")
            print(f"      err: {f['error']}")
    print(f"  Log CSV : {LOG_PATH}")
    print(f"  FROM used: {from_email_in_use}")

    if not sent_ok:
        print(f"  No successful sends — NOT updating leads.status.")
        return

    # Status update only for leads where AT LEAST ONE firm got the follow-up
    leads_to_contact = sorted({r["lead_id"] for r in sent_ok})
    print()
    print(f"  Updating leads.status='contacted' for leads with >=1 sent follow-up:")
    for lid in leads_to_contact:
        url = f"{SUPA}/rest/v1/leads?id=eq.{lid}"
        r = httpx.patch(url, headers=SH, json={"status": "contacted"}, timeout=20)
        cust = next((row["customer_name"] for row in sent_ok if row["lead_id"] == lid), "?")
        print(f"    {lid}  ({cust})  HTTP {r.status_code}  result={r.json()[0]['status'] if r.status_code==200 else r.text[:200]}")


def main():
    p = argparse.ArgumentParser()
    g = p.add_mutually_exclusive_group(required=True)
    g.add_argument("--dry-run", action="store_true")
    g.add_argument("--test", action="store_true")
    g.add_argument("--bulk", action="store_true")
    p.add_argument("--wave-date", default=DEFAULT_WAVE_DATE,
                   help=f"Wave date in DD.MM.YYYY (default: {DEFAULT_WAVE_DATE}). "
                        f"Known waves: {sorted(EXPECTED_WAVES.keys())}")
    args = p.parse_args()

    wave_date = args.wave_date
    expected = EXPECTED_WAVES.get(wave_date)
    if expected is None:
        print(f"WARN: --wave-date {wave_date} not in EXPECTED_WAVES — refuse to send")
        sys.exit(2)

    all_rows = load_csv()
    rows = wave_rows(all_rows, wave_date)
    bad = [r for r in rows if r["lead_id"] not in expected["lead_ids"]]
    if bad:
        print(f"WARN: {len(bad)} rows in wave with unexpected lead_id — abort")
        sys.exit(2)
    if len(rows) != expected["row_count"]:
        print(f"WARN: wave row count = {len(rows)}, expected {expected['row_count']} — abort")
        sys.exit(2)

    if args.dry_run:
        dry_run(rows, wave_date)
    elif args.test:
        test_send(rows)
    elif args.bulk:
        bulk_send(rows)


if __name__ == "__main__":
    main()
