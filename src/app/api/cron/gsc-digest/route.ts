import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getServiceSupabase } from '@/lib/supabase'
import { COUNTRY, BRAND_NAME } from '@/lib/country'

export const dynamic = 'force-dynamic'

interface PageRow {
  page: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

interface DeltaRow {
  page: string
  clicksNow: number
  clicksPrev: number
  imprNow: number
  imprPrev: number
  posNow: number
  posPrev: number
  posDelta: number
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // gsc_page_stats holds CSV imports from the .de Search Console property.
  // The .at deployment fires this cron from a shared vercel.json but has no
  // separate AT GSC import pipeline yet. Skip on AT until that pipeline exists.
  if (COUNTRY === 'AT') {
    return NextResponse.json({ skipped: true, reason: 'gsc-digest is DE-only until AT GSC import pipeline lands' })
  }

  const supabase = getServiceSupabase()

  const { data: periodsRaw } = await supabase
    .from('gsc_page_stats')
    .select('period_end')
    .order('period_end', { ascending: false })
    .limit(500)

  if (!periodsRaw || periodsRaw.length === 0) {
    return NextResponse.json({ sent: false, reason: 'no data in gsc_page_stats' })
  }

  const uniqPeriods = [...new Set(periodsRaw.map((p) => p.period_end as string))]
  if (uniqPeriods.length < 2) {
    return NextResponse.json({ sent: false, reason: 'need at least 2 imported periods' })
  }

  const latestPeriod = uniqPeriods[0]
  const prevPeriod = uniqPeriods[1]

  const [latestRes, prevRes] = await Promise.all([
    supabase.from('gsc_page_stats').select('page, clicks, impressions, ctr, position').eq('period_end', latestPeriod),
    supabase.from('gsc_page_stats').select('page, clicks, impressions, ctr, position').eq('period_end', prevPeriod),
  ])
  const latest = (latestRes.data ?? []) as PageRow[]
  const prev = (prevRes.data ?? []) as PageRow[]

  const prevMap = new Map(prev.map((p) => [p.page, p]))
  const rows: DeltaRow[] = latest
    .filter((l) => prevMap.has(l.page))
    .map((l) => {
      const p = prevMap.get(l.page)!
      return {
        page: l.page,
        clicksNow: l.clicks,
        clicksPrev: p.clicks,
        imprNow: l.impressions,
        imprPrev: p.impressions,
        posNow: Number(l.position),
        posPrev: Number(p.position),
        posDelta: Number(p.position) - Number(l.position),
      }
    })

  const significant = rows.filter((r) => r.imprNow >= 10 && r.imprPrev >= 5)
  const wins = [...significant].sort((a, b) => b.posDelta - a.posDelta).filter((r) => r.posDelta >= 2).slice(0, 5)
  const losses = [...significant].sort((a, b) => a.posDelta - b.posDelta).filter((r) => r.posDelta <= -2).slice(0, 5)

  const sum = (xs: PageRow[], k: 'clicks' | 'impressions') => xs.reduce((a, r) => a + r[k], 0)
  const avg = (xs: DeltaRow[], k: 'posNow' | 'posPrev') => (xs.length ? xs.reduce((a, r) => a + r[k], 0) / xs.length : 0)
  const totals = {
    clicksNow: sum(latest, 'clicks'),
    clicksPrev: sum(prev, 'clicks'),
    imprNow: sum(latest, 'impressions'),
    imprPrev: sum(prev, 'impressions'),
    avgPosNow: avg(rows, 'posNow'),
    avgPosPrev: avg(rows, 'posPrev'),
  }

  const html = buildDigestHtml({ latestPeriod, prevPeriod, wins, losses, totals, pageCount: rows.length })
  const subject = `GSC Digest, ${latestPeriod} · ${wins.length} wins / ${losses.length} losses`

  const resend = new Resend(process.env.RESEND_API_KEY!)
  const { error } = await resend.emails.send({
    from: 'KranVergleich Digest <noreply@send.kranvergleich.de>',
    to: process.env.NOTIFICATION_EMAIL!,
    subject,
    html,
  })

  if (error) {
    return NextResponse.json({ sent: false, reason: 'resend error', error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    sent: true,
    latestPeriod,
    prevPeriod,
    winsCount: wins.length,
    lossesCount: losses.length,
    pagesCompared: rows.length,
    totals,
  })
}

function pct(now: number, prev: number): string {
  if (prev === 0) return now > 0 ? '+∞' : '±0'
  const d = ((now - prev) / prev) * 100
  const sign = d >= 0 ? '+' : ''
  return `${sign}${d.toFixed(0)}%`
}

function fmt(n: number): string {
  return n.toLocaleString('de-DE')
}

function buildRow(r: DeltaRow, variant: 'win' | 'loss'): string {
  const color = variant === 'win' ? '#059669' : '#dc2626'
  const sign = r.posDelta >= 0 ? '+' : ''
  return `
    <tr>
      <td style="padding:8px 10px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:#1f2937;">${r.page}</td>
      <td style="padding:8px 10px;font-family:ui-monospace;font-size:12px;text-align:right;color:#6b7280;">${r.posPrev.toFixed(1)}  ${r.posNow.toFixed(1)}</td>
      <td style="padding:8px 10px;font-family:ui-monospace;font-size:12px;text-align:right;color:${color};font-weight:600;">${sign}${r.posDelta.toFixed(1)}</td>
      <td style="padding:8px 10px;font-family:ui-monospace;font-size:12px;text-align:right;color:#6b7280;">${r.clicksPrev}  ${r.clicksNow}</td>
      <td style="padding:8px 10px;font-family:ui-monospace;font-size:12px;text-align:right;color:#6b7280;">${fmt(r.imprNow)}</td>
    </tr>
  `
}

function buildDigestHtml(args: {
  latestPeriod: string
  prevPeriod: string
  wins: DeltaRow[]
  losses: DeltaRow[]
  totals: { clicksNow: number; clicksPrev: number; imprNow: number; imprPrev: number; avgPosNow: number; avgPosPrev: number }
  pageCount: number
}): string {
  const { latestPeriod, prevPeriod, wins, losses, totals, pageCount } = args
  const winsRows = wins.length ? wins.map((r) => buildRow(r, 'win')).join('') : `<tr><td colspan="5" style="padding:12px;color:#9ca3af;font-size:13px;text-align:center;">Keine nennenswerten Wins diese Woche.</td></tr>`
  const lossesRows = losses.length ? losses.map((r) => buildRow(r, 'loss')).join('') : `<tr><td colspan="5" style="padding:12px;color:#9ca3af;font-size:13px;text-align:center;">Keine nennenswerten Losses, gut.</td></tr>`
  const headerCell = 'padding:6px 10px;font-family:ui-monospace;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;font-weight:600;border-bottom:1px solid #e5e7eb;'

  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:720px;margin:0 auto;padding:24px;color:#1f2937;">
      <div style="border-bottom:2px solid #FFD100;padding-bottom:12px;margin-bottom:20px;">
        <p style="margin:0;font-family:ui-monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6b7280;">${BRAND_NAME} · Weekly GSC Digest</p>
        <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;color:#111827;">${latestPeriod} <span style="color:#9ca3af;font-weight:400;">vs.</span> ${prevPeriod}</h1>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:24px;">
        <div>
          <p style="margin:0;font-family:ui-monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Klicks</p>
          <p style="margin:4px 0 0;font-size:20px;font-weight:700;color:#111827;">${fmt(totals.clicksNow)}</p>
          <p style="margin:2px 0 0;font-size:12px;color:#6b7280;">${pct(totals.clicksNow, totals.clicksPrev)} · vorher ${fmt(totals.clicksPrev)}</p>
        </div>
        <div>
          <p style="margin:0;font-family:ui-monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Impressions</p>
          <p style="margin:4px 0 0;font-size:20px;font-weight:700;color:#111827;">${fmt(totals.imprNow)}</p>
          <p style="margin:2px 0 0;font-size:12px;color:#6b7280;">${pct(totals.imprNow, totals.imprPrev)} · vorher ${fmt(totals.imprPrev)}</p>
        </div>
        <div>
          <p style="margin:0;font-family:ui-monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Avg. Position</p>
          <p style="margin:4px 0 0;font-size:20px;font-weight:700;color:#111827;">${totals.avgPosNow.toFixed(1)}</p>
          <p style="margin:2px 0 0;font-size:12px;color:${totals.avgPosNow <= totals.avgPosPrev ? '#059669' : '#dc2626'};">vorher ${totals.avgPosPrev.toFixed(1)}</p>
        </div>
      </div>

      <h2 style="margin:0 0 8px;font-size:14px;color:#059669;font-weight:600;">▲ Top Wins. Position verbessert</h2>
      <table cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <thead>
          <tr>
            <th style="${headerCell}text-align:left;">Seite</th>
            <th style="${headerCell}text-align:right;">Position</th>
            <th style="${headerCell}text-align:right;">Δ</th>
            <th style="${headerCell}text-align:right;">Klicks</th>
            <th style="${headerCell}text-align:right;">Impr.</th>
          </tr>
        </thead>
        <tbody>${winsRows}</tbody>
      </table>

      <h2 style="margin:0 0 8px;font-size:14px;color:#dc2626;font-weight:600;">▼ Top Losses. Position verschlechtert</h2>
      <table cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <thead>
          <tr>
            <th style="${headerCell}text-align:left;">Seite</th>
            <th style="${headerCell}text-align:right;">Position</th>
            <th style="${headerCell}text-align:right;">Δ</th>
            <th style="${headerCell}text-align:right;">Klicks</th>
            <th style="${headerCell}text-align:right;">Impr.</th>
          </tr>
        </thead>
        <tbody>${lossesRows}</tbody>
      </table>

      <p style="margin:0;padding:12px;background:#f9fafb;border-left:3px solid #FFD100;font-size:12px;color:#6b7280;">
        Verglichen wurden ${pageCount} Seiten, die in beiden Perioden Daten hatten (min. 10 Impressions aktuell, 5 zuvor).
        Filter Δ ≥ 2 Positionen, kleinere Schwankungen wurden als Rauschen ausgefiltert.
      </p>

      <p style="margin:20px 0 0;font-size:11px;color:#9ca3af;">
        Rohdaten: <a href="https://search.google.com/search-console" style="color:#2563eb;">Google Search Console</a>
        · Ambient agent #1 · ${BRAND_NAME}
      </p>
    </div>
  `
}
