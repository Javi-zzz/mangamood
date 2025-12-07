import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { MOODS } from "../components/MoodSelector.jsx";

const moodLabel = (key) => MOODS.find((m) => m.key === key)?.label ?? key;

export default function Favorites() {
  const [favorites] = useLocalStorage("mm:favorites", []);
  const [moodVotes] = useLocalStorage("mm:moodVotes", {});

  if (!favorites.length) {
    return (
      <section className="space-y-2">
        <h1 className="text-2xl font-bold mb-2">Favorites</h1>
        <p className="opacity-80 text-sm">
          You haven&apos;t favorited any manga yet. Go to the Home page, pick a
          mood, and tap the heart on series you like.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Favorites</h1>
      <p className="opacity-80 text-sm">
        Your saved manga, along with any mood tags you&apos;ve given them.
      </p>

      <div className="grid grid-cols-4 gap-3">


        {favorites.map((manga) => {
          const votedMood = moodVotes[manga.mal_id];

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
                <h3 className="font-semibold text-sm line-clamp-2">
                  {manga.title}
                </h3>
                <p className="text-xs opacity-70 line-clamp-3">
                  {manga.synopsis || "No synopsis available."}
                </p>
                {votedMood && (
                  <p className="text-[11px] opacity-80">
                    Your mood tag:{" "}
                    <span className="font-semibold">
                      {moodLabel(votedMood)}
                    </span>
                  </p>
                )}
                <div className="mt-auto text-[11px] flex justify-between items-center pt-2">
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
    </section>
  );
}
