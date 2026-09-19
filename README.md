# Northpeak

A fictional clothing-retail storefront, built as a **testbed for [Friction](https://github.com/emilyau0820/friction)**: a real Astro site, in a real repo, that is only *slightly* faulty on purpose.

Nothing here ships. There's no real inventory, no real payments, and no real customer data — `/checkout` writes to `sessionStorage` and clears itself on confirmation.

## Why this exists

Friction needs a target that behaves like an actual small e-commerce site (multi-page catalogue, product detail, cart, a multi-step checkout) with a handful of small, real, independently-fixable UX bugs — not a giant pile of them, and not a synthetic HTML blob with no source tree to open a pull request against. See [`friction/TESTBED_PLAN.md`](https://github.com/emilyau0820/friction/blob/main/TESTBED_PLAN.md) for the fuller rationale and the roadmap to automated fix PRs.

## The bugs

Nine, one per category Friction's detectors currently look for. Each lives in one or two files, so a fix is a small, single-purpose diff. Full detail (files, page, expected fix) is in [`testbed.manifest.json`](testbed.manifest.json) — that file is ground truth for grading, and isn't imported by the app itself.

| id | category | where |
| --- | --- | --- |
| BUG-01 | `dead_click` | `src/components/AddToCartButton.astro` — clicking "Add to cart" with no size picked does nothing |
| BUG-02 | `retry` | `src/components/PromoCodeForm.astro` — the cart's "Apply" button ignores its first click |
| BUG-03 | `error_text` | `src/components/ProductOptions.astro` — sold-out sizes aren't marked; the error only shows after submit |
| BUG-04 | `long_wait` | `src/pages/products/[slug].astro` — one product page is artificially slow |
| BUG-05 | `modal_interrupt` | `src/components/NewsletterModal.astro` — a signup popup opens unprompted on a timer |
| BUG-06 | `keyboard_trap` | `src/components/NewsletterModal.astro` — the popup traps Tab; only Escape escapes |
| BUG-07 | `ambiguous_label` | `src/components/ProductCard.astro` — every card's button is labeled "Select options", full stop |
| BUG-08 | `loop` | `src/components/ProductCard.astro` + `src/lib/inventory.ts` — stock data exists but listings don't show it |
| BUG-09 | `step_budget` | `src/lib/checkoutSteps.ts` + the `checkout/*-confirm.astro` pages — checkout has two redundant echo-and-confirm screens |

## Structure

```
src/
  components/   AddToCartButton, ProductOptions, ProductCard, NewsletterModal,
                PromoCodeForm, CheckoutProgress — most of the bugs live here
  layouts/      Layout.astro — header, nav, search, cookie banner, footer,
                account-state + wishlist-toggle scripts (run on every page)
  lib/          inventory.ts (product data), checkoutSteps.ts, account.ts,
                orders.ts, reviews.ts
  pages/        /, /collections/[slug] (sort + size filters), /products/[slug]
                (reviews, related products, recently viewed), /search, /cart,
                /wishlist, /checkout/{shipping,shipping-confirm,payment,
                payment-confirm,review,confirm}, /account/{login,signup,index}
testbed.manifest.json   ground truth: bug id -> category -> files -> expected fix
```

None of the nine bugs live in the account/wishlist/reviews/orders features below — they're clean control features, not a tenth fixture:

- **Accounts** are the same kind of fake as checkout: `/account/signup` and `/account/login` write `{ name, email }` to `localStorage` under `np-account` (never the password — nothing verifies credentials, there's no backend). `/account` reads that and redirects to `/account/login` if it's missing; the header nav reflects sign-in state on every page.
- **Orders**: `/checkout/confirm` appends a record to `localStorage["np-orders"]` when a signed-in shopper completes checkout; `/account` lists the ones matching the signed-in email.
- **Wishlist**: a heart-toggle button (`data-wishlist-slug`) appears on every product card and the product page; the toggle handler lives once in `Layout.astro` and works via event delegation, so it applies to cards rendered after page load too. State is `localStorage["np-wishlist"]`, a plain array of slugs. `/wishlist` lists them.
- **Reviews**: each product ships 1–2 seed reviews (`src/lib/reviews.ts`); shopper-submitted reviews are appended to `localStorage["np-reviews-<slug>"]` and merged with the seed set client-side. Never rendered via unescaped `innerHTML`.
- **Recently viewed**: `localStorage["np-recently-viewed"]`, capped at 6, updated on every product page visit.
- **Collection filters/sort**: client-side only — `/collections/[slug]` renders every product in the category up front and a script filters (`hidden`) and reorders (`appendChild`) the existing cards, so it works without a data endpoint.
- **Guest checkout**: `/checkout/shipping` shows a dismissable-by-ignoring "sign in for faster checkout" banner when `np-account` is absent, but never blocks guest checkout.

`/products/[slug]` and `/search` are server-rendered (`prerender = false`) so BUG-04's delay is a genuine per-request wait, not a build-time no-op; everything else is static.

## Commands

```bash
pnpm install
pnpm dev        # localhost:4321
pnpm build
pnpm preview
pnpm test       # vitest — regression coverage over lib/ and the bug catalog, see below
```

## Regression tests

`pnpm test` runs Vitest against `src/lib/` (inventory helpers, checkout step config) and a manifest-consistency check that every `testbed.manifest.json` entry still points at files that exist. These guard the *scaffolding* the bugs sit on, deliberately without asserting away the bugs themselves — the bugs are the fixtures other tests (Friction's own runs, and eventually its fix PRs) get graded against. If a future PR closes one of the nine, delete its row from the manifest in the same PR.
