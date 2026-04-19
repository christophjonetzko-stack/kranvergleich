import type { NextConfig } from "next";
import { _extraCities, seoCities } from "./src/data/cities-static";

// All crane-type slugs — constrains :craneType param in city-level redirects
// so arbitrary /foo-mieten/<city> strings don't hijack the rewrite.
const CRANE_TYPES =
  'minikran-mieten|autokran-mieten|dachdeckerkran-mieten|raupenkran-mieten|anhaengerkran-mieten|mobilkran-mieten|baukran-mieten|ladekran-mieten';

// Compound-slug short forms: Supabase stores the long slug, but users and
// Google Request Indexing often guess the short one (observed as a wave of
// 404s on /{type}/frankfurt this week). Only include names where the short
// form is a plausible guess; skip twin-town slugs (fredersdorf-vogelsdorf,
// blankenfelde-mahlow) where nobody truncates the name.
const compoundSlugMap: Record<string, string> = {
  frankfurt: 'frankfurt-am-main',
  landsberg: 'landsberg-am-lech',
  woerth: 'woerth-am-rhein',
};

// Lazy-ASCII → real slug for seoCities with proper-transliterated umlauts
// (ä→ae, ö→oe, ü→ue). Users and Google Request Indexing often drop the
// umlaut vowel ("munchen") instead of transliterating ("muenchen"),
// producing 404s on real city×type pages. Only includes cities with pages
// in seoCities (i.e. resolve to 200 after redirect).
const seoCityUmlautMap: Record<string, string> = {
  dusseldorf: 'duesseldorf',
  koln: 'koeln',
  nurnberg: 'nuernberg',
  munchen: 'muenchen',
  monchengladbach: 'moenchengladbach',
  lubeck: 'luebeck',
  munster: 'muenster',
  luneburg: 'lueneburg',
  rudersdorf: 'ruedersdorf',
};

// _extraCities: 45 cities with frontend autocomplete entries but no Supabase
// row, so direct URLs currently 404. Each carries a nearestSlug pointing at
// the closest city with firms. Use 307 (permanent: false) so we can promote
// any of these to a real seoCity later without fighting a cached permanent
// redirect. Skip any slug that also appears in seoCities (Lübeck is in both
// lists — that's a separate data bug tracked in memory).
const seoCitySlugs = new Set(seoCities.map((c) => c.slug));
const extraCityNearestMap: Record<string, string> = Object.fromEntries(
  _extraCities
    .filter((c) => c.nearestSlug !== null && !seoCitySlugs.has(c.slug))
    .map((c) => [c.slug, c.nearestSlug as string])
);

// Lazy-ASCII variants for _extraCities with umlaut-transliterated slugs.
// Point at the same nearestSlug as the proper slug. Hand-curated because
// generic "ue→u / oe→o / ae→a" would over-transform slugs like "moers"
// where the vowel pair is native spelling, not a transliteration.
const extraCityUmlautMap: Record<string, string> = {
  gottingen: 'hannover',     // Göttingen → goettingen → hannover
  mulheim: 'essen',          // Mülheim → muelheim → essen
  osnabruck: 'hannover',     // Osnabrück → osnabrueck → hannover
  saarbrucken: 'mannheim',   // Saarbrücken → saarbruecken → mannheim
  wurzburg: 'nuernberg',     // Würzburg → wuerzburg → nuernberg
};

const nextConfig: NextConfig = {
  async redirects() {
    // Permanent 308 — consolidates short forms into real seoCity pages.
    const citySlugPermanentRedirects = Object.entries({
      ...compoundSlugMap,
      ...seoCityUmlautMap,
    }).map(([short, real]) => ({
      source: `/:craneType(${CRANE_TYPES})/${short}`,
      destination: `/:craneType/${real}`,
      permanent: true,
    }));

    // Temporary 307 — _extraCities without own page fall back to nearestSlug.
    const extraCityTempRedirects = Object.entries({
      ...extraCityNearestMap,
      ...extraCityUmlautMap,
    }).map(([slug, nearest]) => ({
      source: `/:craneType(${CRANE_TYPES})/${slug}`,
      destination: `/:craneType/${nearest}`,
      permanent: false,
    }));

    return [
      // hebekran mieten (500/mies.) → synonym for Minikran/Mobilkran
      {
        source: '/hebekran-mieten',
        destination: '/minikran-mieten',
        permanent: true,
      },
      // kranwagen mieten (500/mies.) → colloquial for Autokran
      {
        source: '/kranwagen-mieten',
        destination: '/autokran-mieten',
        permanent: true,
      },
      // /kranmiete cannibalized /kran-mieten-preise (0 imp vs 447 imp in GSC)
      // consolidate link equity into the ranking page
      {
        source: '/kranmiete',
        destination: '/kran-mieten-preise',
        permanent: true,
      },
      // /anhaengerkran-mieten-preise cannibalized /anhaengerkran-mieten
      // (0 imp vs 35 imp pos 22 in GSC) — consolidate into the ranking page
      {
        source: '/anhaengerkran-mieten-preise',
        destination: '/anhaengerkran-mieten',
        permanent: true,
      },
      // /ratgeber/autokran-mieten-kosten merged into /autokran-mieten
      // (0 imp vs 228 imp pos 40 in GSC) — content moved into ratgeber
      // section on the type page
      {
        source: '/ratgeber/autokran-mieten-kosten',
        destination: '/autokran-mieten',
        permanent: true,
      },
      // /ratgeber/baukran-mieten-kosten merged into /baukran-mieten
      // (0 imp vs 401 imp pos 38 in GSC) — content moved into ratgeber
      // section on the type page
      {
        source: '/ratgeber/baukran-mieten-kosten',
        destination: '/baukran-mieten',
        permanent: true,
      },
      // /ratgeber/mobilkran-mieten-kosten merged into /mobilkran-mieten
      // (0 imp vs 160 imp pos 50 in GSC) — content moved into ratgeber
      // section on the type page
      {
        source: '/ratgeber/mobilkran-mieten-kosten',
        destination: '/mobilkran-mieten',
        permanent: true,
      },
      // /ratgeber/dachdeckerkran-mieten merged into /dachdeckerkran-mieten
      // duplicate URL stem caused cannibalization (ratgeber 0 imp vs type
      // page 61 imp pos 26.8 in GSC, with cost query at pos 6)
      {
        source: '/ratgeber/dachdeckerkran-mieten',
        destination: '/dachdeckerkran-mieten',
        permanent: true,
      },
      // City slug shorthand → real slug (compound + umlaut-lazy variants)
      ...citySlugPermanentRedirects,
      // _extraCities → nearest city with a real page (temporary redirect)
      ...extraCityTempRedirects,
    ];
  },
};

export default nextConfig;
