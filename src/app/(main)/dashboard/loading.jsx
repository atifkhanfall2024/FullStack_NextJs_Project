"use client";
import { useEffect, useState } from "react";

export default function Loading() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="w-full px-4 pt-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-full max-w-sm rounded-xl border border-indigo-500/20 bg-slate-950/70 p-4 shadow"
            >
              <div className="h-4 w-3/4 animate-pulse rounded bg-indigo-500/20" />
              <div className="mt-3 h-3 w-full animate-pulse rounded bg-indigo-500/15" />
              <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-fuchsia-500/15" />
              <div className="mt-3 h-3 w-32 animate-pulse rounded bg-slate-700/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
