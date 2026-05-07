// Twitter card image — same visual as opengraph-image.tsx so the preview is
// consistent across LinkedIn / X / WhatsApp / Slack. Re-exports the OG default
// rather than duplicating the JSX so a future tweak in opengraph-image.tsx
// flows here automatically.

export { default, alt, size, contentType } from './opengraph-image'
