import { MOODS } from "./MoodSelector.jsx";

const moodLabel = (key) => MOODS.find((m) => m.key === key)?.label ?? key;

export default function RecommendationsGrid({
  items = [],
  isLoading,
  error,
  selectedMood,     // the mood that triggered the search
  moodVotes = {},   // { [mal_id]: "happy" | "sad" | ... }
  favorites = [],   // array of manga objects
  onVoteMood,       // (mangaId, moodKey)
  onToggleFavorite, // (mangaObject)
}) {
  const favoriteIds = new Set(favorites.map((m) => m.mal_id));

  if (isLoading) {
    return <p className="opacity-80">Loading recommendations…</p>;
  }

  if (error) {
    return <p className="text-red-300">Error: {String(error)}</p>;
  }

  if (!items.length) {
    return <p className="opacity-70">Pick a mood to get manga suggestions.</p>;
  }

  return (
    <div className="space-y-4">
      {selectedMood && (
        <p className="text-sm opacity-80">
          Showing manga for mood:{" "}
          <span className="font-semibold">{moodLabel(selectedMood)}</span>
        </p>
      )}

      <div className="grid grid-cols-4 gap-3">


        {items.map((manga) => {
          const votedMood = moodVotes[manga.mal_id];
          const isFavorite = favoriteIds.has(manga.mal_id);

          return (
            <article
              key={manga.mal_id}
              className="rounded-xl overflow-hidden border border-white/10 bg-white/5 flex flex-col"
            >
              <img
                src={manga.images?.jpg?.image_url}
                alt={manga.title}
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="p-3 space-y-2 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-semibold text-sm line-clamp-2">
                    {manga.title}
                  </h3>
                  {/* favorite button */}
                  <button
                    type="button"
                    onClick={() => onToggleFavorite?.(manga)}
                    className="text-xs"
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorite ? "❤️" : "🤍"}
                  </button>
                </div>

                <p className="text-xs opacity-70 line-clamp-3">
                  {manga.synopsis || "No synopsis available."}
                </p>

                {/* Current mood tag (your contribution) */}
                <div className="text-[11px] mt-1">
                  {votedMood ? (
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-white/10">
                      Your mood tag:{" "}
                      <span className="font-semibold">
                        {moodLabel(votedMood)}
                      </span>
                    </span>
                  ) : selectedMood ? (
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-white/5 opacity-80">
                      Suggested mood:{" "}
                      <span className="font-semibold">
                        {moodLabel(selectedMood)}
                      </span>
                    </span>
                  ) : null}
                </div>

                {/* Mood voting UI */}
                <div className="mt-2">
                  <p className="text-[11px] opacity-70 mb-1">
                    How did this feel to you?
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {MOODS.map((m) => (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => onVoteMood?.(manga.mal_id, m.key)}
                        className={
                          "text-[11px] px-2 py-0.5 rounded-full border transition " +
                          (votedMood === m.key
                            ? "bg-white text-black border-white"
                            : "border-white/20 hover:border-white/60")
                        }
                      >
                        {m.emoji} {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-3 text-[11px] flex justify-between items-center">
                  <a
                    href={manga.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    View on MyAnimeList
                  </a>
                  {manga.score && (
                    <span className="opacity-70">Score: {manga.score}</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
