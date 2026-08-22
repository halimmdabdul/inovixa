import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Admin-uploaded images (team photos, blog covers, service images) are
    // stored in Supabase Storage and served from this pattern. Scoped to
    // the public storage path rather than the whole *.supabase.co host.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
