"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [User, setUser] = useState(null);
  const route = useRouter();

  // ✅ Theme state
  const [theme, setTheme] = useState("dark");

  // ✅ Load theme + user on mount
  useEffect(() => {
    // theme load
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // user load
    fetch("/api/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  // ✅ toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // ✅ logout
  const HandleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/logout", {}, { withCredentials: true });
      toast.success(res?.data?.message || "Logout Success");
      route.push("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  if (!User) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Left: Brand */}
        <a href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white shadow-sm">
            MM
          </div>

          <span className="text-base font-semibold tracking-wide text-slate-900 dark:text-white">
            {`Welcome ${User?.UserName || "To Mystry Messages"}`}
          </span>
        </a>

        {/* Middle: Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <a
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-black/5 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
          >
           {User? 'Home' : ""}
          </a>
          <a
            href="/dashboard/messages"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-black/5 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
          >
           {User? 'Messages' : ""}
          </a>
          <a
            href="/dashboard/discover"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-black/5 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
          >
          {User? 'Discover' : ""}
          </a>
          <a
            href="/dashboard/about"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-black/5 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
          >
          {User? 'About' : ""}
          </a>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-64 rounded-xl border border-black/10 bg-black/5 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-500 outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-400"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400">
                ⌘K
              </span>
            </div>
          </div>

          {/* ✅ Theme toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-xl border border-black/10 bg-black/5 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Logout */}
          <a
            href="/signin"
            onClick={HandleLogout}
            className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-black/5 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
          >
           {User? 'Logout' : "Login"}
          </a>

          {/* Get started */}
          <a
            href="/signup"
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 active:opacity-90"
          >
            Get started
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="ml-1 inline-flex items-center justify-center rounded-xl border border-black/10 bg-black/5 p-2 text-slate-800 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 md:hidden"
            aria-label="Open menu"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav (static) */}
      <div className="border-t border-black/10 bg-white/80 dark:border-white/10 dark:bg-slate-950/80 md:hidden">
        <nav className="mx-auto grid max-w-6xl gap-1 px-4 py-3 sm:px-6">
          <a
            href="/dashboard"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-black/5 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Home
          </a>
          <a
            href="/messages"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-black/5 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Messages
          </a>
          <a
            href="/discover"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-black/5 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Discover
          </a>
          <a
            href="/about"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-black/5 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
          >
            About
          </a>

          <div className="pt-2">
            <a
              href="/signup"
              className="block w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              Get started
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
