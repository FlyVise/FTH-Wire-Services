# FTH Wire Services — Website

A simple, static marketing site for FTH Wire Services (forex / university fee payments / outward remittance). No build step, no framework — just HTML, CSS, and a bit of vanilla JS.

## Structure

```
├── index.html      Homepage — hero, services, process, KYC docs, FAQ, testimonials
├── contact.html     Contact page — contact info + enquiry form
├── styles.css       Shared styles used by both pages
└── rates.js         Shared script that powers the live currency ticker
```

## Live exchange rate ticker

The scrolling ticker at the top of both pages, and the rate card on the homepage, pull live rates client-side from [open.er-api.com](https://www.exchangerate-api.com/) — a free, keyless exchange rate API. It fetches on page load and refreshes every 60 seconds. If the API is unreachable, it falls back to showing the last known / indicative rates rather than breaking.

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

1. Push these four files to the root of your repo (or to `/docs` if you prefer).
2. In the repo's **Settings → Pages**, set the source to the branch/folder containing `index.html`.
3. GitHub will serve `index.html` automatically at your Pages URL.

## Notes

- Fonts (Fraunces, IBM Plex Sans, IBM Plex Mono) load from Google Fonts via `<link>` tags in each HTML file's `<head>`.
- All internal links are relative, so the site works whether it's hosted at a domain root or a subpath.
- Rates and figures shown (exchange rates, stats, testimonials) are placeholder/illustrative content for this design — replace with real, verified figures before going live.
