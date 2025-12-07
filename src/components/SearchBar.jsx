import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (onSearch) onSearch(text.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-center mb-4"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search manga by title..."
        className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-white/50 outline-none"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition"
      >
        Search
      </button>
    </form>
  );
}
