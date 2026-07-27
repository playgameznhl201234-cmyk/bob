Self-hosted client-result videos
================================

All three result clips are served from this folder, so they play inline on
the site — no external link, no Instagram branding, no dependency on posts
staying public.

  progression.mp4        43s  before/after exercise progression
  ankle-to-lacrosse.mp4  12s  client result: ankle pain -> lacrosse
  youth-athlete.mp4      67s  young athlete interview

Each has a matching .jpg poster (the still shown before you press play).
They're listed in the VIDEOS array in components/Results.tsx.

To add or replace one:
  1. Put the .mp4 (and ideally a .jpg poster) in this folder
  2. Add an entry to VIDEOS in components/Results.tsx:
       { file: "/videos/name.mp4",
         poster: "/videos/name.jpg",
         label: "Short description for screen readers" }

Source videos were transcoded to 720x1280 H.264 at ~1.8 Mbps, which keeps
them small while looking sharp on the card. Videos only download when a
visitor presses play (poster + preload="metadata"), so they don't slow the
page down.
