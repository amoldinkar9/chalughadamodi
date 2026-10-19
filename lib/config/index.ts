/**
 * Application Configuration & Environment Settings
 * Centralizes domain configurations, security tokens, upload limits, and external URLs.
 */

export const APP_CONFIG = {
  // Domain Configuration
  domains: {
    primary: "chalughadamodi.in",
    secondary: "mpsccurrentaffairs.in",
    adminHostname: "veronica.chalughadamodi.in",
    primaryUrl: "https://chalughadamodi.in",
    secondaryUrl: "https://mpsccurrentaffairs.in",
  },

  // Security & Authentication
  auth: {
    cookieName: "admin_session",
    maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
    tokenSalt: "cg_admin_auth_salt_v2_2026_opennext",
    rateLimitMaxAttempts: 5,
    rateLimitWindowMs: 15 * 60 * 1000, // 15 minutes
  },

  // File Upload Configuration
  uploads: {
    maxSizeBytes: 5 * 1024 * 1024, // 5MB
    allowedFolders: [
      "announcements",
      "gallery",
      "magazines",
      "tests",
      "testimonials",
      "hero",
      "general",
    ] as const,
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ] as const,
  },

  // External Links & Integrations
  external: {
    tcs9BaseUrl: "https://www.tcs9.in",
    tcs9TestSeries: "https://www.tcs9.in/mr/test-series",
    googleFormBudget: "https://docs.google.com/forms/d/e/1FAIpQLSfhsmLYW6e5BIxDTOPuIrfl2z45qb0-_41Nl7N3MPzhXEcDjw/viewform",
  },
} as const;

export type AllowedUploadFolder = typeof APP_CONFIG.uploads.allowedFolders[number];
export type AllowedMimeType = typeof APP_CONFIG.uploads.allowedMimeTypes[number];

export function getDomainFromHost(hostHeader?: string | null): {
  domain: string;
  isSecondary: boolean;
  siteName: string;
  brandTitle: string;
} {
  const host = (hostHeader || "").toLowerCase().split(":")[0];
  const isSecondary = host.includes("mpsccurrentaffairs");
  return {
    domain: isSecondary ? APP_CONFIG.domains.secondaryUrl : APP_CONFIG.domains.primaryUrl,
    isSecondary,
    siteName: isSecondary ? "MPSC Current Affairs" : "चालू घडामोडी",
    brandTitle: isSecondary
      ? "MPSC Current Affairs | मराठी चालू घडामोडी — MPSC, तलाठी, पोलीस भरती"
      : "चालू घडामोडी | मराठी Current Affairs मोफत — MPSC, तलाठी, पोलीस भरती",
  };
}
