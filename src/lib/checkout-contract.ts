import { z } from "zod";
import { MAX_CART_LINES } from "./cart-items";

export const checkoutRequest = z.object({
  items: z.array(z.object({ slug: z.string().max(80), variantId: z.string().min(1).max(40).optional(), quantity: z.number().int().min(1).max(100) })).min(1).max(MAX_CART_LINES),
  method: z.enum(["card", "venmo"]),
  customer: z.object({
    name: z.string().trim().min(2).max(120), email: z.email().max(254),
    organization: z.string().trim().min(2).max(200),
    researchPurpose: z.string().trim().min(20).max(2000),
    address: z.string().trim().min(3).max(200), address2: z.string().trim().max(200),
    city: z.string().trim().min(2).max(100), state: z.string().regex(/^[A-Z]{2}$/),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/),
  }),
  researchOnly: z.literal(true),
  // Optional anonymous metadata; malformed analytics must never reject an order.
  analytics: z.object({
    distinctId: z.string().regex(/^snp_[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
    viewportBucket: z.enum(["mobile", "tablet", "desktop"]),
  }).optional().catch(undefined),
});
export type CheckoutRequest = z.infer<typeof checkoutRequest>;
export interface CheckoutConfig {
  enabled: boolean; methods: ("card" | "venmo")[]; shippingCents: number;
  states: string[]; supportEmail: string;
}
export interface OrderView {
  id: string; status: "awaiting_review" | "approved" | "rejected" | "paid";
  method: "card" | "venmo"; subtotalCents: number; shippingCents: number;
  totalCents: number; items: { slug: string; variantId?: string; name: string; quantity: number; unitCents: number }[];
  venmoHandle?: string;
}
