# FTH Wire Services — Website

A simple, static marketing site for FTH Wire Services (forex / university fee payments / outward remittance). No build step, no framework — just HTML, CSS, and a bit of vanilla JS.

## Structure

```
├── index.html               Home — hero, stats, services, process, why-choose-us
├── about.html                About Us — story, principles, trust panel
├── forex-card.html           Forex Card — card options, features, how to get one
├── outward-remittance.html   Outward Remittance — LRS limit, 17 supported purposes, process
├── contact.html               Contact page — contact info + enquiry form
├── styles.css                 Shared styles used by every page
├── rates.js                   Shared script that powers the live currency ticker
├── nav.js                     Mobile nav menu toggle
└── animations.js              Scroll-triggered fades, staggered reveals, and hover transitions (Framer Motion)
```

FTH Wire Services positions itself as an RBI-authorized Dealer – Category II handling university fee payments, forex cards, and outward remittance directly (not a rate-comparison referral service). All five pages share the same header/nav, footer, ticker, and design system.

## Animations

Scroll-triggered fades, staggered reveals, and hover transitions are powered by [Motion](https://motion.dev) — the same animation engine as Framer Motion, published for plain JS as the `motion` npm package. Since there's no build step, `animations.js` loads it at runtime from the jsDelivr CDN (`https://cdn.jsdelivr.net/npm/motion@13/+esm`).

- Elements with a `.reveal` class fade/slide in individually when scrolled into view; `.reveal-group` animates its direct children with a staggered delay.
- `.btn`, `.service-card`, and `.kyc-card` get a subtle lift/scale on hover.
- `prefers-reduced-motion: reduce` skips all of the above and shows content immediately.
- If the CDN can't be reached, `animations.js` falls back to showing all reveal content immediately rather than leaving it hidden.

## Live exchange rate ticker

The scrolling ticker at the top of every page pulls live rates client-side from [open.er-api.com](https://www.exchangerate-api.com/) — a free, keyless exchange rate API. It fetches on page load and refreshes every 60 seconds. If the API is unreachable, it falls back to showing the last known / indicative rates rather than breaking. The homepage hero's "Rate Comparison" card is a static illustrative example (not live data) — see the note in that card.

No API key or backend is required — this all runs in the visitor's browser.

## Contact form

The form on `contact.html` submits to [Formspree](https://formspree.io/) — a free form backend, no server code needed. On submit it `fetch()`-POSTs the form fields to a Formspree endpoint and shows a success message once Formspree accepts it.

**To go live:** create a free Formspree account, add a new form, and copy its form ID. In `contact.html`, find this line near the bottom of the file and replace `YOUR_FORM_ID` with your real ID:

```js
var FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

Until you do that, submissions will fail against the placeholder endpoint and the form automatically falls back to opening a `mailto:` link addressed to `info@fthwireservices.com` instead, so the form never dead-ends for a visitor.

## WhatsApp chat

Every page has a floating "Chat on WhatsApp" button (bottom-right) that opens a pre-filled chat with `08447 786270` via a `wa.me` click-to-chat link — no setup required. To change the number, update the `wa.me/91...` link inside the `.whatsapp-fab` anchor in each HTML file (and in `styles.css` if you want to restyle it).

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

- Fonts (Fraunces, IBM Plex Sans, IBM Plex Mono) load from Google Fonts via `<link>` tags in each HTML file's `<head>`.
- All internal links are relative, so the site works whether it's hosted at a domain root or a subpath.
- Rates and figures shown (exchange rates, stats, savings example) are placeholder/illustrative content for this design — replace with real, verified figures before going live.
