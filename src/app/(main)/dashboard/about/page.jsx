export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur sm:p-10">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Mystery Messages
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About Mystery Messages
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
            Mystery Messages is a fun, privacy-focused place where people can share
            thoughts anonymously—kind words, honest feedback, or a little mystery.
            No pressure, no judgment. Just messages that matter.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <h3 className="text-sm font-semibold text-white">Anonymous by design</h3>
              <p className="mt-2 text-sm text-slate-300">
                Send and receive messages without exposing personal identity.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <h3 className="text-sm font-semibold text-white">Simple & fast</h3>
              <p className="mt-2 text-sm text-slate-300">
                Clean UI, quick actions, and no complicated setup.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <h3 className="text-sm font-semibold text-white">Safer experience</h3>
              <p className="mt-2 text-sm text-slate-300">
                Built with basic rules to keep things respectful and useful.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/messages"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              Explore Messages
            </a>
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-xl font-semibold">Why we built this</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Sometimes you want to say something honest—appreciation, advice, or
              feedback—but you don’t want the awkwardness that comes with names.
              Mystery Messages helps you communicate openly while keeping the vibe
              friendly and safe.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-indigo-400" />
                Anonymous notes for friends, teams, or communities
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-fuchsia-400" />
                Positive “drop a compliment” style messages
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Quick feedback loops without pressure
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-xl font-semibold">How it works</h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                <p className="text-sm font-semibold">1) Create your link</p>
                <p className="mt-1 text-sm text-slate-300">
                  Share a profile/message link where others can send anonymous notes.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                <p className="text-sm font-semibold">2) Receive messages</p>
                <p className="mt-1 text-sm text-slate-300">
                  Messages arrive in your inbox—read, save, or delete them anytime.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                <p className="text-sm font-semibold">3) Stay in control</p>
                <p className="mt-1 text-sm text-slate-300">
                  You decide what to keep and what to ignore. Your space, your rules.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Tip</p>
              <p className="mt-2 text-sm text-slate-300">
                Add a short note like “Be kind & constructive” near your link—people
                usually follow the vibe you set.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Mystery Messages — built with privacy in mind.
        </footer>
      </section>
    </div>
  );
}
