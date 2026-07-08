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

## Connect the contact form (Formspree)

The form posts to Formspree — no backend or API keys in this repo.

1. Create a free account at [formspree.io](https://formspree.io) **using
   painfreediana@gmail.com** (submissions are delivered to the account email,
   or any address you verify in the dashboard).
2. Click **New form**, name it (e.g. "Consultation requests"), and copy the
   form ID from its endpoint — the `abcdwxyz` part of
   `https://formspree.io/f/abcdwxyz`.
3. Create a file called `.env.local` in the project root (copy
   `.env.example`) and set:

   ```
   NEXT_PUBLIC_FORMSPREE_ID=abcdwxyz
   ```

4. On Vercel, add the same variable under
   **Project → Settings → Environment Variables**, then redeploy.

Until the ID is set, the form falls back to opening the visitor's own email
app with a message pre-addressed to painfreediana@gmail.com and all their
answers filled in — submissions still arrive, nothing silently disappears.
(Formspree is still worth setting up: the mailto fallback depends on the
visitor having an email app configured and pressing send.)

Want to switch providers later (Resend, a custom API route, etc.)? The only
files that touch Formspree are [`lib/config.ts`](lib/config.ts) and the
`fetch` call in
[`components/ContactForm.tsx`](components/ContactForm.tsx).

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

## Swap in real content

Every piece of dummy content is marked with a `PLACEHOLDER` comment — search
the project for `PLACEHOLDER` to find them all:

| What | Where |
| --- | --- |
| Logo (currently recreated as text) | `components/Logo.tsx` |
| Google rating trust line | `components/Hero.tsx` |
| Testimonial quotes | `components/Testimonials.tsx` |
| Before/after photos + result stats | `components/Results.tsx` + `public/images/placeholders/` |
| Headshot + bio + certifications | `components/About.tsx` |
| Production domain (social previews, sitemap, structured data) | `app/layout.tsx` (`metadataBase`) + `lib/config.ts` (`url`) |
| Social share image (auto-generated from brand fonts) | `app/opengraph-image.tsx` |

Contact details, social links, and the Formspree ID all live in
[`lib/config.ts`](lib/config.ts).

When you replace the placeholder SVGs with real photos (`.jpg`/`.webp`),
consider switching the `<img>` tags in `Results.tsx` and `About.tsx` to
[`next/image`](https://nextjs.org/docs/app/api-reference/components/image)
for automatic optimization, and delete the visible "Placeholder" badges.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In [vercel.com](https://vercel.com), **Add New → Project**, import the
   repo — Next.js is auto-detected, no settings needed.
3. Add the `NEXT_PUBLIC_FORMSPREE_ID` environment variable (see above).
4. Deploy, then attach the custom domain under **Settings → Domains** and
   update `metadataBase` in `app/layout.tsx` to match.
