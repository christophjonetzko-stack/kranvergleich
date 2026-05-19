"""How fast do firms typically respond to signal-back loop? Baseline before
declaring Uebel-no-response a problem."""
import os
import sys
import json
from datetime import datetime

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = os.path.join(os.path.dirname(__file__), "..", ".env.local")
if os.path.exists(ENV_FILE):
    with open(ENV_FILE, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip())

from supabase import create_client

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

# All signal-back responses ever — peek at one row first to learn the schema
peek = sb.table("lead_responses").select("*").limit(1).execute().data
print(f"lead_responses schema sample: {list(peek[0].keys()) if peek else '(table empty)'}")
ts_col = "responded_at" if peek and "responded_at" in peek[0] else "clicked_at" if peek and "clicked_at" in peek[0] else "id"
lr = sb.table("lead_responses").select("*").order(ts_col, desc=True).limit(500).execute().data
print(f"Total lead_responses ever: {len(lr)}")
for r in lr[:30]:
    print(f"  {json.dumps({k: v for k, v in r.items() if k != 'user_agent'}, default=str, ensure_ascii=False)[:200]}")

# lead_companies with feedback received → time between sent_at + feedback_received_at
print("\n" + "=" * 70)
print("Response latency (sent_at → feedback_received_at) for all responded firms")
print("=" * 70)
lc = (
    sb.table("lead_companies")
    .select("sent_at, feedback_received_at, feedback_outcome, feedback_notes, company_id, lead_id")
    .not_.is_("feedback_received_at", "null")
    .order("feedback_received_at", desc=True)
    .limit(100)
    .execute()
    .data
)
print(f"Rows with feedback: {len(lc)}")
for r in lc[:30]:
    try:
        sent = datetime.fromisoformat(r["sent_at"].replace("Z", "+00:00"))
        recv = datetime.fromisoformat(r["feedback_received_at"].replace("Z", "+00:00"))
        delta_h = (recv - sent).total_seconds() / 3600
        print(f"  sent={r['sent_at'][:19]}  recv={r['feedback_received_at'][:19]}  Δ={delta_h:.1f}h  outcome={r.get('feedback_outcome')}")
    except Exception as e:
        print(f"  parse failed: {e}")

# How many leads sent in last 60d? How many got a response?
print("\n" + "=" * 70)
print("Response rate — last 60d")
print("=" * 70)
import datetime as dt
cutoff = (dt.datetime.now(dt.timezone.utc) - dt.timedelta(days=60)).isoformat()
total = sb.table("lead_companies").select("id", count="exact").gte("sent_at", cutoff).execute()
responded = sb.table("lead_companies").select("id", count="exact").gte("sent_at", cutoff).not_.is_("feedback_received_at", "null").execute()
print(f"  Total firm dispatches:  {total.count}")
print(f"  Got a response:         {responded.count}")
if total.count:
    print(f"  Response rate:          {responded.count / total.count * 100:.1f}%")
