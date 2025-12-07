// export the moods so other components can reuse them
export const MOODS = [
  { key: "happy", label: "Happy", emoji: "😃", hint: "Comedy • Slice of life" },
  { key: "calm", label: "Calm", emoji: "😌", hint: "Iyashikei • Soothing" },
  { key: "sad", label: "Sad", emoji: "😔", hint: "Drama • Emotional" },
  { key: "excited", label: "Excited", emoji: "⚡", hint: "Action • High energy" },
];

export default function MoodSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {MOODS.map((mood) => (
        <button
          key={mood.key}
          onClick={() => onChange(mood.key)}
          className={`rounded-xl p-4 border border-white/10 hover:border-white/30 transition
            ${value === mood.key ? "ring-2 ring-white/70" : ""}`}
        >
          <div className="text-3xl">{mood.emoji}</div>
          <div className="font-semibold mt-2">{mood.label}</div>
          <div className="text-xs opacity-70">{mood.hint}</div>
        </button>
      ))}
    </div>
  );
}
