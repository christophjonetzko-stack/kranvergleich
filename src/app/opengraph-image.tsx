import { ImageResponse } from 'next/og'

// Next 16 file convention: this default export becomes the site-wide og:image
// for every route under app/, with og:image:width/height/type meta tags auto-
// emitted. Generated at build time and cached. No asset upload needed.
//
// Per-route override: drop another opengraph-image.tsx into a deeper segment
// (e.g. app/ratgeber/opengraph-image.tsx) — Next picks the closest one.
//
// Brand strings are duplicated here (not imported from @/lib/country) because
// next/og runs at Edge Runtime and pulling in country.ts transitively loads
// the Supabase client — which crashes the ImageResponse pipeline ("failed to
// pipe response"). Build-time env switch keeps the AT/DE split working.

const COUNTRY = process.env.NEXT_PUBLIC_COUNTRY === 'AT' ? 'AT' : 'DE'
const BRAND_NAME = COUNTRY === 'AT' ? 'KranVergleich.at' : 'KranVergleich.de'
const COUNTRY_LABEL = COUNTRY === 'AT' ? 'Österreich' : 'Deutschland'

export const alt = `${BRAND_NAME} — Kräne mieten in ${COUNTRY_LABEL} vergleichen`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Palette matches the live site (white bg, neutral-950 headings, neutral-600
// body, #FFD100 yellow accent — same as the strip under <Header>).
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top yellow stripe — same as src/app/layout.tsx h-1 bg-[#FFD100] */}
        <div style={{ display: 'flex', height: 12, width: '100%', background: '#FFD100' }} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            padding: 72,
          }}
        >
          {/* Brand mark — uppercase mono-ish small caps row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 22,
              color: '#525252',
              letterSpacing: 4,
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            <div style={{ display: 'flex', width: 28, height: 2, background: '#0A0A0A' }} />
            <div style={{ display: 'flex' }}>{BRAND_NAME}</div>
          </div>

          {/* Headline + subhead */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div
              style={{
                display: 'flex',
                fontSize: 92,
                color: '#0A0A0A',
                fontWeight: 800,
                lineHeight: 0.98,
                letterSpacing: -2,
              }}
            >
              {`Kräne mieten in ${COUNTRY_LABEL}`}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 38,
                color: '#525252',
                fontWeight: 400,
                lineHeight: 1.25,
              }}
            >
              {`Anbieter & Preise vergleichen — kostenlose Angebote`}
            </div>
          </div>

          {/* Footer crane-types row — separator dot uses neutral-300 to match
              the divider style on the home page hero (bg-neutral-300 dots). */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              fontSize: 24,
              color: '#737373',
              fontWeight: 500,
            }}
          >
            <div style={{ display: 'flex' }}>Mobilkran</div>
            <div style={{ display: 'flex', width: 4, height: 4, background: '#D4D4D4', borderRadius: 999 }} />
            <div style={{ display: 'flex' }}>Autokran</div>
            <div style={{ display: 'flex', width: 4, height: 4, background: '#D4D4D4', borderRadius: 999 }} />
            <div style={{ display: 'flex' }}>Baukran</div>
            <div style={{ display: 'flex', width: 4, height: 4, background: '#D4D4D4', borderRadius: 999 }} />
            <div style={{ display: 'flex' }}>Minikran</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
