import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { MOODS } from "../components/MoodSelector.jsx";

const moodLabel = (key) => MOODS.find((m) => m.key === key)?.label ?? key;

export default function History() {
  const [history] = useLocalStorage("mm:history", []);
  const [moodVotes] = useLocalStorage("mm:moodVotes", {});

  // Build simple stats: how many times each mood was searched
  const moodCounts = history.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const moodStats = Object.entries(moodCounts).map(([key, count]) => ({
    key,
    label: moodLabel(key),
    count,
  }));

  // Also show how many manga have each voted mood (from moodVotes)
  const voteCounts = Object.values(moodVotes).reduce((acc, moodKey) => {
    acc[moodKey] = (acc[moodKey] || 0) + 1;
    return acc;
  }, {});

  const voteStats = Object.entries(voteCounts).map(([key, count]) => ({
    key,
    label: moodLabel(key),
    count,
  }));

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Mood History</h1>
        <p className="opacity-80 text-sm">
          This page shows how often you&apos;ve searched each mood and how many
          manga you&apos;ve tagged with each mood.
        </p>
      </div>

      {/* Recent history list */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Recent mood searches</h2>
        {history.length === 0 ? (
          <p className="opacity-70 text-sm">
            No history yet. Try picking some moods on the Home page.
          </p>
        ) : (
          <ul className="space-y-1 text-sm max-h-64 overflow-auto pr-1">
            {history.slice(0, 30).map((entry, idx) => (
              <li key={idx} className="opacity-85 flex justify-between gap-4">
                <span>
                  {new Date(entry.ts).toLocaleString()} —{" "}
                  <span className="font-semibold">
                    {moodLabel(entry.mood)}
                  </span>
                </span>
                <span className="opacity-60">
                  {entry.count} manga found
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Summary stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Search frequency by mood</h2>
          {moodStats.length === 0 ? (
            <p className="opacity-70 text-sm">No searches yet.</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {moodStats.map((m) => (
                <li key={m.key} className="flex justify-between">
                  <span>{m.label}</span>
                  <span className="opacity-80">{m.count} searches</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Manga mood tags</h2>
          {voteStats.length === 0 ? (
            <p className="opacity-70 text-sm">
              You haven&apos;t tagged any manga moods yet.
            </p>
          ) : (
            <ul className="space-y-1 text-sm">
              {voteStats.map((m) => (
                <li key={m.key} className="flex justify-between">
                  <span>{m.label}</span>
                  <span className="opacity-80">{m.count} manga</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
