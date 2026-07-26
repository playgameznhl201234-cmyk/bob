# PainFreeDiana — marketing site

Single-page marketing website for Diana Kovalenko's personal training business
in Saskatoon. Built with Next.js (App Router) + Tailwind CSS v4, designed
mobile-first around the logo's palette (deep blue `#1D6FA5`, turquoise
`#2FD5C8`, warm cream `#F8F3EA`).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Contact form → email (FormSubmit, no account needed)

The form emails submissions straight to **painfreediana@gmail.com** via
[FormSubmit.co](https://formsubmit.co) — no account, no API key.

**One-time activation:** the first submission triggers an email to
painfreediana@gmail.com from FormSubmit with an **Activate** button. Click
it once, and every submission after that is delivered automatically.

If delivery ever fails (before activation, network hiccup, service down),
the form automatically falls back to opening the visitor's own email app
with the message pre-addressed and pre-filled — no request is ever lost.

To change the destination address, edit `email` in
[`lib/config.ts`](lib/config.ts).

### Spam protection

Out of the box the form uses a built-in **slide-to-verify** human check plus
a hidden honeypot and a timing guard — no setup, works immediately.

To upgrade to the real **Google reCAPTCHA** ("I'm not a robot"), see the
next section.

## Google reCAPTCHA (optional, recommended for a public site)

Turns the form's human check into the genuine Google reCAPTCHA v2 widget,
**verified on the server** so a bot can't get an email through without
passing Google's challenge. It stays fully working with the slide-to-verify
fallback until you add the keys.

1. Go to the
   [reCAPTCHA admin console](https://www.google.com/recaptcha/admin/create)
   (sign in with any Google account).
2. Register a site: pick **reCAPTCHA v2 → "I'm not a robot" Checkbox**.
3. Under **Domains** add `painfreediana.com` (and `localhost` if you want it
   to work in local development too).
4. Accept the terms and submit. You'll get two keys:
   - **Site key** (public)
   - **Secret key** (private — never share it)
5. Add both to `.env.local` (copy `.env.example`) **and** to Vercel under
   **Project → Settings → Environment Variables**, then redeploy:

   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
   RECAPTCHA_SECRET_KEY=your_secret_key
   ```

The moment both keys are set, the form swaps the slide check for the real
reCAPTCHA widget, verified at [`app/api/contact`](app/api/contact/route.ts).

## Set up direct booking (Google Calendar + Zoom)

Let clients pick a consultation slot themselves:

1. Sign in to [Google Calendar](https://calendar.google.com) as
   painfreediana@gmail.com → **Create → Appointment schedule**.
2. Name it "Free consultation (30 min)", set the weekly availability.
3. For Zoom: paste Diana's personal Zoom meeting room link into the
   schedule's **Location** field (free Gmail accounts otherwise default to
   Google Meet, which also works fine).
4. Open the schedule → **Share → Open booking page**, copy the link.
5. Paste it as `bookingUrl` in [`lib/config.ts`](lib/config.ts) — a
   "book your consultation time directly" link appears under the contact
   form automatically.

## Legal pages

`/privacy` and `/terms` are drafted to match how the site actually works
(form → email, Instagram embeds, no tracking cookies) and linked in the
footer. **Have them reviewed by a legal professional before launch**, and
update them if you add analytics or other services.

## Connect Google reviews

The hero trust line ("5.0 on Google · 40+ reviews") can show the **live**
rating from Diana's Google Business Profile:

1. Make sure the business has a
   [Google Business Profile](https://business.google.com) (this is also what
   makes it show up on Google Maps — free).
2. Find the **Place ID** with Google's
   [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   (search "PainFreeDiana Saskatoon").
3. In [Google Cloud Console](https://console.cloud.google.com), create a
   project, enable **Places API (New)**, and create an **API key**
   (restrict it to the Places API).
4. Add both values to `.env.local` (copy `.env.example`) and to Vercel's
   environment variables:

   ```
   GOOGLE_PLACES_API_KEY=your_key
   GOOGLE_PLACE_ID=your_place_id
   ```

Once set, the hero shows the real rating and review count, linked to the
Google reviews page, and refreshes at most once per day — one API call a day
sits comfortably in Google's free tier. Until then the marked placeholder
line renders instead. All the logic is in
[`lib/google-reviews.ts`](lib/google-reviews.ts).

## Saving & backing up the project

The project is a git repository (created automatically). To save your work:

```bash
git add -A && git commit -m "Describe your change"
```

To back it up online and enable Vercel deploys, create a GitHub repository
and push:

```bash
# with GitHub CLI (brew install gh; gh auth login):
gh repo create painfreediana --private --source=. --push

# or manually: create an empty repo on github.com, then
git remote add origin https://github.com/YOUR_USERNAME/painfreediana.git
git push -u origin main
```

From then on, every `git push` triggers a fresh Vercel deploy (once the repo
is imported in Vercel — see below).

## Content: what's real, what's left

Real and live: the logo, Diana's headshot, the three client testimonials, the
seated good morning before/after photos, and the Instagram videos.

Still marked with a `PLACEHOLDER` comment (search the project to find them):

| What | Where |
| --- | --- |
| Bio specifics (years coaching, client count) | `components/About.tsx` |
| Google rating trust line (shows a neutral line until reviews exist) | `components/Hero.tsx` |

Everyday content lives here:

| What | Where |
| --- | --- |
| Contact email (delivery only — never shown on the site), socials, booking URL | `lib/config.ts` |
| Testimonials | `components/Testimonials.tsx` |
| Before/after photos + caption | `components/Results.tsx` + `public/images/` |
| Instagram video links | `INSTAGRAM_VIDEOS` in `components/Results.tsx` |
| FAQ questions | `components/FAQ.tsx` |

**Note on the contact email:** it is deliberately not displayed anywhere on
the site (no `mailto:` links, not in the structured data) to keep it away
from scrapers and spam. Visitors reach Diana through the contact form; the
address in `lib/config.ts` is only used to deliver those submissions.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In [vercel.com](https://vercel.com), **Add New → Project**, import the
   repo — Next.js is auto-detected, no settings needed.
3. (Optional) Add the Google reviews environment variables (see above).
4. Deploy, then attach the custom domain under **Settings → Domains** and
   update `metadataBase` in `app/layout.tsx` to match.
