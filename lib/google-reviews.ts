/**
 * Live Google rating for the hero trust line, via the Places API (New).
 *
 * Setup (see README.md "Connect Google reviews" for full steps):
 * 1. Find the business's Place ID
 * 2. Enable "Places API (New)" in Google Cloud and create an API key
 * 3. Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in .env.local / Vercel
 *
 * Until both env vars are set, this returns null and the hero shows its
 * marked placeholder line instead. The value is cached and refreshed at most
 * once a day (ISR), so API usage stays within Google's free tier.
 */

export type GoogleRating = {
  rating: number;
  count: number;
  url: string;
};

export async function getGoogleRating(): Promise<GoogleRating | null> {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!placeId || !apiKey) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount`,
      {
        headers: { "X-Goog-Api-Key": apiKey },
        next: { revalidate: 86400 },
      },
    );
    if (!response.ok) return null;
    const data: { rating?: number; userRatingCount?: number } =
      await response.json();
    if (typeof data.rating !== "number") return null;
    return {
      rating: data.rating,
      count: data.userRatingCount ?? 0,
      url: `https://search.google.com/local/reviews?placeid=${placeId}`,
    };
  } catch {
    return null;
  }
}
