import { Link, NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import History from "./pages/History.jsx";
import AccountBanner from "./components/AccountBanner.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 bg-black/40 backdrop-blur border-b border-white/10">
        <nav className="mx-auto max-w-6xl px-4 py-3 flex items-start justify-between">
          {/* left side reserved for future logo */}
          <div />

          {/* right side: title + nav stacked */}
          <div className="flex flex-col items-end gap-2">
            <Link to="/" className="font-bold text-3xl">
              MangaMood
            </Link>

            <div className="flex flex-col items-end gap-1 text-sm">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "underline font-semibold"
                    : "opacity-80 hover:opacity-100"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive
                    ? "underline font-semibold"
                    : "opacity-80 hover:opacity-100"
                }
              >
                Favorites
              </NavLink>

              <NavLink
                to="/history"
                className={({ isActive }) =>
                  isActive
                    ? "underline font-semibold"
                    : "opacity-80 hover:opacity-100"
                }
              >
                History
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      {/* Account banner */}
      <AccountBanner />

      {/* Page Container */}
      <main className="flex-1 mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 py-6 text-xs opacity-70">
        MangaMood • Built with React + Tailwind • © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
