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
    ]
  },
};

export default nextConfig;
