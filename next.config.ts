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
    ]
  },
};

export default nextConfig;
