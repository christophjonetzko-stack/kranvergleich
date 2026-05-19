"""Query Resend API: did su-bau@outlook.de actually receive the firm-notification email?"""
import os
import sys
import json
import urllib.request
import urllib.error

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = os.path.join(os.path.dirname(__file__), "..", ".env.local")
if os.path.exists(ENV_FILE):
    with open(ENV_FILE, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip())

key = os.environ.get("RESEND_API_KEY")
if not key:
    print("RESEND_API_KEY not in .env.local")
    sys.exit(1)

# Resend emails list endpoint. We don't have an ID, so list recent and filter.
req = urllib.request.Request(
    "https://api.resend.com/emails?limit=100",
    headers={
        "Authorization": f"Bearer {key}",
        "User-Agent": "Mozilla/5.0 (kranvergleich-ops/1.0)",
        "Accept": "application/json",
    },
)
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode("utf-8"))
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}: {e.read().decode('utf-8')[:400]}")
    sys.exit(1)

print(f"Resend response keys: {list(data.keys())}")
emails = data.get("data", [])
print(f"Returned {len(emails)} recent emails\n")

# Filter to today (2026-05-19) + Uebel destination + Greb keyword
hits = []
for e in emails:
    to_addr = e.get("to", [])
    to_str = ", ".join(to_addr) if isinstance(to_addr, list) else str(to_addr)
    created = e.get("created_at", "")
    subject = e.get("subject", "")
    if "uebel" in to_str.lower() or "su-bau" in to_str.lower() or "greb" in subject.lower() or "corinna" in subject.lower() or ("2026-05-19" in created and "Würzburg" in subject) or ("2026-05-19" in created and "Wurzburg" in subject):
        hits.append(e)

print(f"Matching (Uebel / Greb / Würzburg) emails: {len(hits)}\n")
for e in hits:
    print(f"  id={e.get('id')}")
    print(f"  created_at={e.get('created_at')}")
    print(f"  to={e.get('to')}")
    print(f"  subject={e.get('subject')}")
    print(f"  last_event={e.get('last_event')}")
    print()

# Also dump first 5 latest no matter what so we can see today's traffic
print("\n--- Latest 5 regardless of match ---")
for e in emails[:5]:
    print(f"  {e.get('created_at')}  to={e.get('to')}  subject={e.get('subject')[:60]}  last_event={e.get('last_event')}")
