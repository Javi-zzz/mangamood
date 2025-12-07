const BASE = "https://api.jikan.moe/v4";

// map high-level moods to search queries
const moodToQuery = {
  happy: "comedy slice of life",
  calm: "iyashikei slice of life",
  sad: "drama tragedy psychological",
  excited: "action adventure shounen",
};

export async function searchByMood(mood, page = 1) {
  const q = moodToQuery[mood] ?? "slice of life";

  const url =
    `${BASE}/manga` +
    `?q=${encodeURIComponent(q)}` +
    `&order_by=score&sort=desc` +
    `&sfw=true&limit=24` +
    `&page=${page}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Jikan error ${res.status}`);
  }
  const data = await res.json();
  return data.data || [];
}

export async function searchByTitle(query) {
  if (!query.trim()) return [];

  const url =
    `${BASE}/manga` +
    `?q=${encodeURIComponent(query)}` +
    `&order_by=popularity&sort=asc` +
    `&sfw=true&limit=24`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Jikan error ${res.status}`);
  }
  const data = await res.json();
  return data.data || [];
}
