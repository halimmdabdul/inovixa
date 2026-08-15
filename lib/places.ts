import "server-only";
import type { NearbyBusiness } from "@/types";

const REQUEST_TIMEOUT_MS = 8000;

interface PlacesTextSearchResponse {
  status: string;
  error_message?: string;
  results?: {
    name: string;
    formatted_address: string;
    rating?: number;
    user_ratings_total?: number;
  }[];
}

/**
 * Looks up businesses matching a free-text query (e.g. "roofing in Austin,
 * TX") via the Google Places Text Search API. Returns `available: false`
 * (rather than throwing) when GOOGLE_PLACES_API_KEY isn't configured, so the
 * nearby-businesses section of the site checker can be hidden gracefully
 * instead of showing a broken feature to visitors.
 */
export async function findNearbyBusinesses(query: string): Promise<{
  available: boolean;
  results: NearbyBusiness[];
}> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return { available: false, results: [] };
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
  url.searchParams.set("query", query);
  url.searchParams.set("key", apiKey);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url.toString(), { signal: controller.signal });
    if (!response.ok) {
      console.error("[places] request failed with status", response.status);
      return { available: true, results: [] };
    }

    const data = (await response.json()) as PlacesTextSearchResponse;
    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      console.error("[places] API error", data.status, data.error_message);
      return { available: true, results: [] };
    }

    const results: NearbyBusiness[] = (data.results ?? []).slice(0, 5).map((place) => ({
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      reviewCount: place.user_ratings_total,
    }));

    return { available: true, results };
  } catch (error) {
    console.error("[places] request failed", error);
    return { available: true, results: [] };
  } finally {
    clearTimeout(timeout);
  }
}
