// Public configuration only. Never put provider secrets in this file.
// Unconfirmed commercial rules remain inactive until the owner supplies them.
export const storefrontSettings = {
  legalName: "Salt N' Pep Labs LLC",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "hello@saltnpeplabs.com",
  accountUrl: process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_URL || "",
  chatUrl: process.env.NEXT_PUBLIC_SUPPORT_CHAT_URL || "",
  newsletterUrl: process.env.NEXT_PUBLIC_NEWSLETTER_SIGNUP_URL || "",
  referralUrl: process.env.NEXT_PUBLIC_REFERRAL_PORTAL_URL || "",
};
export function publicHttpsUrl(value: string) {
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password ? url.href : ""; } catch { return ""; }
}
