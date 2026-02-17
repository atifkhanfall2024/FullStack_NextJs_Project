'use client'
export default function DashboardCard({ title = "Dashboard Card", children }) {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-950/50 p-6 shadow-lg backdrop-blur sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
            Dashboard
          </span>
        </div>

        <div className="mt-5 text-sm leading-relaxed text-slate-300">
          {children ? (
            children
          ) : (
            <p>
              Put your dashboard content here (stats, buttons, recent messages, etc.).
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
            Secondary
          </button>
          <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-95">
            Primary
          </button>
        </div>
      </div>
    </div>
  );
}
