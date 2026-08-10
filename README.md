# FTH Wire Services — Website

A simple, static marketing site for FTH Wire Services (forex / university fee payments / outward remittance). No build step, no framework — just HTML, CSS, and a bit of vanilla JS.

## Structure

```
├── index.html       Homepage — hero, process, services, why-us, KYC docs, rate calculator, testimonials, FAQ
├── contact.html      Contact page — contact info + enquiry form
├── styles.css        Shared styles used by both pages
├── rates.js          Shared script that powers the live currency ticker + rate card
├── calculator.js     Quick "amount → INR" rate calculator on the homepage, fed by rates.js
├── nav.js            Mobile nav menu toggle + notice-bar dismiss
└── animations.js     Scroll-triggered fades, staggered reveals, and hover transitions (Framer Motion)
```

## Design

The visual design (palette, type, and component patterns — the notary-seal ring logo, ledger-row lists, cert-box hero card, calc-card) is adapted from a Chartered Accountant firm template, reskinned for a forex/wire service:

- **Type**: Cormorant Garamond (display serif), DM Sans (body), DM Mono (mono/numerals) — loaded from Google Fonts.
- **Palette**: warm parchment background, near-black ink, muted gold accent, deep maroon "seal" accent — tokens are CSS custom properties at the top of `styles.css` (`--ink`, `--gold`, `--seal`, etc.), so re-theming is a one-file edit.
- **Logo**: the circular seal mark (ring + tick marks + curved text + "FW" monogram) is a hand-built inline SVG, generated once and pasted into the header, footer, hero watermark, and featured testimonial — see git history for the generator script if you need to regenerate it (e.g. to change the establishment year or ring text).

## Animations

Scroll-triggered fades, staggered reveals, and hover transitions are powered by [Motion](https://motion.dev) — the same animation engine as Framer Motion, published for plain JS as the `motion` npm package. Since there's no build step, `animations.js` loads it at runtime from the jsDelivr CDN (`https://cdn.jsdelivr.net/npm/motion@13/+esm`).

- Elements with a `.reveal` class fade/slide in individually when scrolled into view; `.reveal-group` animates its direct children with a staggered delay.
- Buttons, ledger rows, KYC/testimonial cards, and area tags get a subtle lift/scale (or shift, for ledger rows) on hover.
- The hero headline's typewriter effect and caret are plain CSS (`@keyframes typeReveal`) — a one-off load animation, not a scroll/hover interaction, so it doesn't need the CDN.
- `prefers-reduced-motion: reduce` skips all of the above and shows content immediately.
- If the CDN can't be reached, `animations.js` falls back to showing all reveal content immediately rather than leaving it hidden.

## Live exchange rate ticker & calculator

The scrolling ticker at the top of both pages, and the rate card and "Quick Rate Check" calculator on the homepage, pull live rates client-side from [open.er-api.com](https://www.exchangerate-api.com/) — a free, keyless exchange rate API. It fetches on page load and refreshes every 60 seconds. If the API is unreachable, it falls back to showing the last known / indicative rates rather than breaking.

`rates.js` exposes the latest fetched rates as `window.FTH_RATES` and fires a `fth:rates` event on every refresh; `calculator.js` listens for that event to power the amount → INR calculator without re-fetching anything itself.

No API key or backend is required — this all runs in the visitor's browser.

## Contact form

The form on `contact.html` doesn't submit to a server. On submit, it builds a `mailto:` link from the entered fields and opens the visitor's email client with the message pre-filled, addressed to `info@fthwireservices.com`. Nothing is sent until the visitor hits send in their own email app.

If you'd rather have real form submissions land somewhere (e.g. a spreadsheet, inbox, or database), swap this out for a form backend like [Formspree](https://formspree.io/), [Getform](https://getform.io/), or a small serverless function — the existing field names and layout in `contact.html` will drop in easily.

## Running locally

No build step — just open `index.html` in a browser, or serve the folder with any static server, e.g.:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push these files to the root of your repo (or to `/docs` if you prefer).
2. In the repo's **Settings → Pages**, set the source to the branch/folder containing `index.html`.
3. GitHub will serve `index.html` automatically at your Pages URL.

## Notes

- Fonts (Cormorant Garamond, DM Sans, DM Mono) load from Google Fonts via `@import` in `styles.css`.
- All internal links are relative, so the site works whether it's hosted at a domain root or a subpath.
- Rates and figures shown (exchange rates, stats, testimonials) are placeholder/illustrative content for this design — replace with real, verified figures before going live.
