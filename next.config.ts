import type { NextConfig } from "next";

/*
 * Cabeceras de seguridad básicas. La CSP solo incluye directivas que no
 * dependen de los scripts cargados (GTM, Vercel Insights, mapa de Google),
 * para no romper la medición al activarla.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Next 16 requires every quality used by <Image> to be allowlisted.
    qualities: [50, 75],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
