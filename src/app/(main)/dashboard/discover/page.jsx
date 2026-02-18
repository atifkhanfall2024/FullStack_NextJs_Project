"use client";
import { useEffect, useMemo, useState } from "react";

export default function DiscoverPage() {
  // Demo data (replace with your API later)
  const [users, setUsers] = useState([
    { _id: "1", username: "ahmad_dev", bio: "Send me anonymous feedback ✨", active: true },
    { _id: "2", username: "noor_khan", bio: "Be kind. Drop a message 💬", active: true },
    { _id: "3", username: "saad_codes", bio: "Honest feedback welcome ✅", active: false },
    { _id: "4", username: "maryam_ui", bio: "UI/UX learner — suggestions?", active: true },
    { _id: "5", username: "zain_ds", bio: "Data Science — roast my project 😅", active: false },
  ]);

  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("suggested"); // suggested | trending

  // If you want to fetch from API later:
  // useEffect(() => {
  //   fetch("/api/discover")
  //     .then((r) => r.json())
  //     .then((d) => setUsers(d.users || []));
  // }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = users;

    if (tab === "trending") list = users.filter((u) => u.active);

    if (!q) return list;
    return list.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        (u.bio || "").toLowerCase().includes(q)
    );
  }, [users, query, tab]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold sm:text-3xl">Discover</h1>
          <p className="mt-2 text-sm text-slate-300">
            Find profiles and send anonymous messages — safely and respectfully.
          </p>
        </div>

        {/* Search + Tabs */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <span className="text-slate-400">⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by username..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setTab("suggested")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                tab === "suggested"
                  ? "bg-white/10 border border-white/10"
                  : "bg-transparent border border-white/10 text-slate-300 hover:bg-white/5"
              }`}
            >
              Suggested
            </button>
            <button
              onClick={() => setTab("trending")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                tab === "trending"
                  ? "bg-white/10 border border-white/10"
                  : "bg-transparent border border-white/10 text-slate-300 hover:bg-white/5"
              }`}
            >
              Trending
            </button>
          </div>
        </div>

        {/* Quick prompts */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold">Quick prompts</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "Say something nice 💛",
              "Give honest feedback ✅",
              "Confess anonymously 😅",
              "Rate my skills 🎯",
              "What should I improve? 🚀",
            ].map((p) => (
              <button
                key={p}
                onClick={() => setQuery(p.replace(/[^a-zA-Z0-9 ]/g, "").trim())}
                className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs text-slate-200 hover:bg-white/10"
              >
                {p}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Tip: Keep messages respectful. Harassment or abusive content is not
            allowed.
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
            No profiles found.
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {filtered.map((u) => (
              <div
                key={u._id}
                className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/60 p-4 shadow hover:bg-white/5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">@{u.username}</p>
                    <p className="mt-1 text-xs text-slate-300">
                      {u.bio || "Send me a message!"}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-[11px] border ${
                      u.active
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                        : "border-white/10 bg-white/5 text-slate-300"
                    }`}
                  >
                    {u.active ? "Active" : "New"}
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <a
                    href={`/u/${u.username}`}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs font-semibold text-white hover:bg-white/10"
                  >
                    View Profile
                  </a>
                  <a
                    href={`/u/${u.username}/send`}
                    className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-2 text-center text-xs font-semibold text-white hover:opacity-95"
                  >
                    Send Message
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
