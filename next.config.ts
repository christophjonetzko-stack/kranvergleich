import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
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
      // City slug mismatch: Supabase stores compound slugs ("frankfurt-am-main",
      // "landsberg-am-lech", "woerth-am-rhein") but users and Google Request
      // Indexing often guess the short form. Redirect short → real slug across
      // all crane types. Twin-town slugs (fredersdorf-vogelsdorf,
      // blankenfelde-mahlow) are NOT redirected — nobody truncates them.
      {
        source: '/:craneType(minikran-mieten|autokran-mieten|dachdeckerkran-mieten|raupenkran-mieten|anhaengerkran-mieten|mobilkran-mieten|baukran-mieten|ladekran-mieten)/frankfurt',
        destination: '/:craneType/frankfurt-am-main',
        permanent: true,
      },
      {
        source: '/:craneType(minikran-mieten|autokran-mieten|dachdeckerkran-mieten|raupenkran-mieten|anhaengerkran-mieten|mobilkran-mieten|baukran-mieten|ladekran-mieten)/landsberg',
        destination: '/:craneType/landsberg-am-lech',
        permanent: true,
      },
      {
        source: '/:craneType(minikran-mieten|autokran-mieten|dachdeckerkran-mieten|raupenkran-mieten|anhaengerkran-mieten|mobilkran-mieten|baukran-mieten|ladekran-mieten)/woerth',
        destination: '/:craneType/woerth-am-rhein',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
