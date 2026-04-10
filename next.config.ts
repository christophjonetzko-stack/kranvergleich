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
    ]
  },
};

export default nextConfig;
