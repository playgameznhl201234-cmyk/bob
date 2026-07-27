Self-hosted client-result videos
================================

Drop .mp4 files here, then add them to the VIDEOS array in
components/Results.tsx, e.g.:

  { file: "/videos/good-morning.mp4",
    poster: "/videos/good-morning.jpg",
    label: "Seated good morning before and after" },

Self-hosted videos play inline on the site with no external link, load
faster than Instagram embeds, carry no Instagram branding, and cannot
break if a post is deleted or the account goes private.

Tip: a poster image (a still frame) makes the card look good before the
visitor presses play.
