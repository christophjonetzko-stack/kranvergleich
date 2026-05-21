// Shared og:image reference for page-level metadata.
//
// app/opengraph-image.tsx + app/twitter-image.tsx are Next 16 file conventions
// that inject og:image / twitter:image at the layout level. But Next's metadata
// merge REPLACES the openGraph object when a page sets its own, so pages with
// per-page metadata (custom title/desc/type) lose the file-convention images.
//
// Fix: pages with their own openGraph block must explicitly include OG_IMAGE in
// `images:` to keep the social preview rendered. The file convention still
// generates the actual image bytes, this just keeps Next emitting the meta tag.

import { BRAND_NAME, COUNTRY_LABEL } from './country'

export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: `${BRAND_NAME}. Kräne mieten in ${COUNTRY_LABEL} vergleichen`,
} as const
