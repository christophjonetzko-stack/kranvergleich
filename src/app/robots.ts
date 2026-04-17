import type { MetadataRoute } from 'next'

// AEO-first policy: explicitly allow AI crawlers and answer engines.
// Strategic rationale: BAZA_WIEDZY_KATALOG_v3 §7 (AEO) and §19 (MCP/ambient
// businesses) treat AI citations as the primary distribution channel of the
// next decade. Blocking GPTBot/ClaudeBot/Google-Extended would close that
// channel before it opens.
// Note: Cloudflare's "Block AI Scrapers and Crawlers" managed feature can
// still override this at the edge — it must also be disabled in the CF
// dashboard (Security → Bots → AI Scrapers and Crawlers).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      // Explicit allow for AI / answer-engine crawlers.
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'GoogleOther',
          'Applebot-Extended',
          'Bytespider',
          'CCBot',
          'meta-externalagent',
          'Amazonbot',
        ],
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: 'https://kranvergleich.de/sitemap.xml',
  }
}
