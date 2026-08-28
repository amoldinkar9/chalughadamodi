import { headers } from "next/headers";

export const DOMAINS = {
  CHALU: "chalughadamodi.in",
  MPSC: "mpsccurrentaffairs.in",
} as const;

export async function getActiveDomain(): Promise<string> {
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    // Normalize host: split port and convert to lowercase
    const cleanHost = host.split(":")[0].toLowerCase();

    if (cleanHost.includes(DOMAINS.MPSC)) {
      return DOMAINS.MPSC;
    }
    return DOMAINS.CHALU;
  } catch {
    // Fallback if headers() is called outside dynamic request context (e.g. during prerendering/build)
    return DOMAINS.CHALU;
  }
}

export interface DomainConfig {
  baseUrl: string;
  brandName: string;
  title: string;
  description: string;
  ogImage: string;
}

export function getDomainConfig(domain: string): DomainConfig {
  if (domain === DOMAINS.MPSC) {
    return {
      baseUrl: `https://${DOMAINS.MPSC}`,
      brandName: "MPSC Current Affairs",
      title: "MPSC Current Affairs | मराठी चालू घडामोडी मोफत — MPSC, तलाठी, पोलीस भरती",
      description: "MPSC Current Affairs — MPSC, तलाठी, पोलीस भरती, रेल्वे, SSC GD, सरळसेवा, वनरक्षक — सर्व परीक्षांसाठी मोफत मराठी चालू घडामोडी, मासिक PDF, आणि रोजच्या टेस्ट.",
      ogImage: `https://${DOMAINS.MPSC}/og-image.png`,
    };
  }

  // Default / chalughadamodi.in
  return {
    baseUrl: `https://${DOMAINS.CHALU}`,
    brandName: "चालू घडामोडी",
    title: "चालू घडामोडी | मराठी Current Affairs मोफत — MPSC, तलाठी, पोलीस भरती",
    description: "MPSC, तलाठी, पोलीस भरती, रेल्वे, SSC GD, सरळसेवा, वनरक्षक — सर्व परीक्षांसाठी मोफत मराठी चालू घडामोडी, मासिक PDF, आणि रोजच्या टेस्ट. Static GS शी जोडलेले.",
    ogImage: `https://${DOMAINS.CHALU}/og-image.png`,
  };
}
