import { useEffect, useState } from "react";
import MoodSelector, { MOODS } from "../components/MoodSelector.jsx";
import RecommendationsGrid from "../components/RecommendationsGrid.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { searchByMood, searchByTitle } from "../api/jikan.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export default function Home() {
  const [mood, setMood] = useState(null);
  const [page, setPage] = useState(1);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const [moodVotes, setMoodVotes] = useLocalStorage("mm:moodVotes", {});
  const [favorites, setFavorites] = useLocalStorage("mm:favorites", []);
  const [history, setHistory] = useLocalStorage("mm:history", []);

  // When mood or page changes, fetch mood-based recommendations
  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      if (!mood) {
        setItems([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await searchByMood(mood, page);
        if (!cancelled) {
          setItems(data);
          // log this mood+page search in history
          setHistory((prev) =>
            [{ ts: Date.now(), mood, page, count: data.length }, ...prev].slice(
              0,
              100
            )
          );
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Failed to load manga.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    // Only fetch mood-based data when we're NOT in search mode
    if (!searching) {
      fetchData();
    }

    return () => {
      cancelled = true;
    };
  }, [mood, page, searching, setHistory]);

  // Change mood: reset page + exit search mode
  function handleChangeMood(newMood) {
    setMood(newMood);
    setPage(1);
    setSearching(false);
    setSearchResults([]);
    setSearchError(null);
  }

  // Mood voting per manga
  function handleVoteMood(mangaId, moodKey) {
    setMoodVotes((prev) => {
      const current = prev[mangaId];
      if (current === moodKey) {
        const copy = { ...prev };
        delete copy[mangaId];
        return copy;
      }
      return { ...prev, [mangaId]: moodKey };
    });
  }

  // Favorites toggle
  function handleToggleFavorite(manga) {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.mal_id === manga.mal_id);
      if (exists) {
        return prev.filter((m) => m.mal_id !== manga.mal_id);
      }
      return [manga, ...prev].slice(0, 200);
    });
  }

  // Title search handler
  async function handleSearch(query) {
    if (!query) {
      setSearching(false);
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    setSearching(true);
    setSearchError(null);

    try {
      const results = await searchByTitle(query);
      setSearchResults(results);
    } catch (err) {
      setSearchError(err.message);
    }
  }

  const moodLabel =
    mood ? MOODS.find((m) => m.key === mood)?.label ?? mood : null;

  const showingItems = searching ? searchResults : items;
  const showingError = searching ? searchError : error;
  const showingLoading = searching ? false : isLoading;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">How do you feel right now?</h1>
        <p className="opacity-80 text-sm">
          Pick a mood, discover manga — or search by title, then help tag how
          each series actually feels as new chapters drop.
        </p>
      </div>

      <MoodSelector value={mood} onChange={handleChangeMood} />

      {moodLabel && !searching && (
        <p className="text-sm opacity-80">
          Current mood: <span className="font-semibold">{moodLabel}</span>{" "}
          (page {page})
        </p>
      )}

      <SearchBar onSearch={handleSearch} />

      <RecommendationsGrid
        items={showingItems}
        isLoading={showingLoading}
        error={showingError}
        selectedMood={searching ? null : mood}
        moodVotes={moodVotes}
        favorites={favorites}
        onVoteMood={handleVoteMood}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Pagination for mood-based results only */}
      {!searching && showingItems.length > 0 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`px-3 py-1 rounded border ${
              page <= 1
                ? "border-white/10 text-white/30 cursor-not-allowed"
                : "border-white/30 hover:border-white/60"
            }`}
          >
            ◀ Previous
          </button>

          <span className="opacity-80">Page {page}</span>

          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded border border-white/30 hover:border-white/60"
          >
            Next ▶
          </button>
        </div>
      )}
    </section>
  );
}
