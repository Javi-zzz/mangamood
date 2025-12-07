import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export default function AccountBanner() {
  const [user, setUser] = useLocalStorage("mm:user", null);
  const [tempName, setTempName] = useState("");

  function handleCreate(e) {
    e.preventDefault();
    if (!tempName.trim()) return;
    setUser({ name: tempName.trim() });
    setTempName("");
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <div className="border-b border-white/5 bg-white/5">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between text-sm">
        {user ? (
          <>
            <p className="opacity-80">
              Logged in as <span className="font-semibold">{user.name}</span>
            </p>
            <button
              onClick={handleLogout}
              className="text-xs border border-white/30 rounded-full px-3 py-1 hover:bg-white hover:text-black transition"
            >
              Switch account
            </button>
          </>
        ) : (
          <form
            onSubmit={handleCreate}
            className="flex flex-wrap items-center gap-2 w-full justify-between"
          >
            <p className="opacity-80">
              Create a MangaMood account (no email required for now):
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Username"
                className="bg-black/40 border border-white/20 rounded-full px-3 py-1 text-xs outline-none focus:border-white/70"
              />
              <button
                type="submit"
                className="text-xs border border-white/30 rounded-full px-3 py-1 hover:bg-white hover:text-black transition"
              >
                Create
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
