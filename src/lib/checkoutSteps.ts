export interface CheckoutStep {
  path: string;
  label: string;
}

/**
 * BUG-09 (step_budget): a real checkout only needs three screens — shipping,
 * payment, review-and-place. This one pads each with a standalone "confirm"
 * echo screen that repeats the previous step's data back with a second
 * "Confirm" button before letting the shopper move on, doubling the path to
 * purchase for no reason.
 */
export const CHECKOUT_STEPS: CheckoutStep[] = [
  { path: "/checkout/shipping", label: "Shipping address" },
  { path: "/checkout/shipping-confirm", label: "Confirm shipping address" },
  { path: "/checkout/payment", label: "Payment method" },
  { path: "/checkout/payment-confirm", label: "Confirm payment method" },
  { path: "/checkout/review", label: "Review order" },
  { path: "/checkout/confirm", label: "Order placed" },
];

export function stepIndex(path: string): number {
  return CHECKOUT_STEPS.findIndex((step) => step.path === path);
}
