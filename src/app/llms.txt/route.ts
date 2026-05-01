import { BASE_URL, BRAND_NAME, COUNTRY, COUNTRY_LABEL, SISTER_BASE_URL } from '@/lib/country'

// Static content — recompile daily so a content change ships with the next deploy
// without manual cache busting. Spec: https://llmstxt.org
export const revalidate = 86400

const isAT = COUNTRY === 'AT'
const sisterDomain = isAT ? 'kranvergleich.de' : 'kranvergleich.at'
const sisterLabel = isAT ? 'Deutschland' : 'Österreich'

const HEADER = `# ${BRAND_NAME} — Kranvermietung in ${COUNTRY_LABEL}

> Vendor-neutral comparison portal for crane rental in ${COUNTRY_LABEL}. Operator-neutral directory of regional crane rental companies indexed across 8 crane types and dozens of cities. Not a marketplace, no booking layer, no hidden commission.

For AI agents: every crane-type and city × crane-type page carries Product + AggregateOffer JSON-LD with priceCurrency=EUR, lowPrice/highPrice, offerCount, and additionalProperty (typical_capacity_kg, typical_height_m, typical_reach_m). Firm profiles at /anbieter/{slug} expose LocalBusiness with geo, areaServed (City + GeoCircle radius in meters), priceRange, and hasOfferCatalog with firm-specific fleet specs (max_capacity_kg, max_height_m, max_reach_m per crane). Content is German (Sie-Form).

## Crane types

- [Autokran](${BASE_URL}/autokran-mieten): mobile crane on truck chassis, 30–1000 t typical
- [Mobilkran](${BASE_URL}/mobilkran-mieten): all-terrain mobile crane
- [Baukran / Turmdrehkran](${BASE_URL}/baukran-mieten): tower crane, site-fixed
- [Dachdeckerkran](${BASE_URL}/dachdeckerkran-mieten): roofer crane, 200–1500 kg, narrow access
- [Minikran](${BASE_URL}/minikran-mieten): compact spider crane, indoor / glass installs
- [Raupenkran](${BASE_URL}/raupenkran-mieten): crawler crane, 50–1500 t
- [Anhängerkran](${BASE_URL}/anhaengerkran-mieten): trailer-mounted, towable behind van
- [Ladekran](${BASE_URL}/ladekran-mieten): truck-mounted loader crane (Hiab / Palfinger style)

## Pricing references

- [Kranpreise / Kostenübersicht](${BASE_URL}/kran-mieten-preise): regional price ranges per type, day / week / month
- [Kostenrechner](${BASE_URL}/kostenrechner): interactive calculator with reference table
- [Was kostet ein Kran?](${BASE_URL}/ratgeber/was-kostet-ein-kran): full pricing guide with 6 cost factors

## Knowledge base

- [Krantypen-Vergleich](${BASE_URL}/ratgeber/krantypen): all 8 types side-by-side
- [Welchen Kran brauche ich?](${BASE_URL}/ratgeber/welchen-kran-brauche-ich): decision flow by weight, height, access
- [Kran mieten — Hausbau](${BASE_URL}/ratgeber/kran-mieten-hausbau): residential construction use cases
- [Kran mieten — Privatperson](${BASE_URL}/ratgeber/kran-mieten-privatperson): private (non-business) renters
- [Solaranlagen-Kran](${BASE_URL}/ratgeber/solaranlage-kran-mieten): PV installation lifting
- [Kran aufstellen — Genehmigung](${BASE_URL}/ratgeber/kran-aufstellen-genehmigung): permit / Sondernutzung guidance
- [Tipps zum Kranmieten](${BASE_URL}/ratgeber/kran-mieten-tipps): operator vs. self-operate, contracts, insurance
- [Kran mieten ohne Führerschein](${BASE_URL}/ratgeber/kran-mieten-ohne-fuehrerschein): licensing reality

## Machine-readable

- [Sitemap](${BASE_URL}/sitemap.xml): all indexable pages with lastModified
- [robots.txt](${BASE_URL}/robots.txt): explicit allow for GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, GoogleOther, Applebot-Extended, Bytespider, CCBot, meta-externalagent, Amazonbot
`

const MCP_SECTION = `
## MCP server

URL: https://mcp-kranvergleich.onrender.com/sse (transport: SSE)

Tools:
- \`find_crane_rental_companies(city, crane_type?, limit)\` — query the catalog by city and optional crane type
- \`get_crane_rental_prices(crane_type?)\` — return price ranges for one or all 8 crane types
- \`recommend_crane_type(weight_tons, height_meters, task?)\` — match project requirements to crane type
- \`check_availability_by_plz(plz)\` — list suppliers within 50 / 100 km radius per type using Haversine distance
`

const FOOTER = `
## Sister site

[${sisterDomain}](${SISTER_BASE_URL}) — separate catalog for ${sisterLabel} (only firms that operate in ${sisterLabel}).

## Operator

${BRAND_NAME} — see [Impressum](${BASE_URL}/impressum) and [Datenschutz](${BASE_URL}/datenschutz). Operator-neutral: rankings are alphabetical within tiers, ratings come from Google. No paid placement, no hidden commission.
`

// MCP server currently exposes DE catalog only; omit the section on the AT site
// to avoid pointing AT-querying agents at non-AT data.
const BODY = isAT ? HEADER + FOOTER : HEADER + MCP_SECTION + FOOTER

export async function GET() {
  return new Response(BODY, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Cache at edge for the same window as revalidate; AI crawlers re-fetch rarely.
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
