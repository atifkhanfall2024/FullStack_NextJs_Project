"use client";
import { useEffect, useState } from "react";
import DashboardCard from "../../../../components/getMessages/getMessages";
import axios from "axios";
import AcceptMessages from "../../../../components/acceptMessage/acpt";

function Loader() {
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

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let t;

    const getMessage = async () => {
      try {
        const res = await axios.get("/api/get-messages", { withCredentials: true });
        setMessages(res?.data?.message || []);
      } catch (error) {
        console.log(error.message);
        setMessages([]);
      } finally {
        // ✅ force 3 seconds loader
        t = setTimeout(() => setLoading(false), 1000);
      }
    };

    getMessage();

    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader />;

  if (!messages || messages.length === 0) {
    return (
      <p className="text-red-600 text-2xl text-center mt-10">
        No messages found
      </p>
    );
  }


  return (
    <div className="w-full px-4 pt-[20%]">
          <AcceptMessages/>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-center gap-4">

          {messages.slice(0, 5).map((msg) => (
            <DashboardCard
              key={msg._id}
              message={msg}
             onDeleted={(id) => setMessages((prev) => prev.filter((x) => x._id !== id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
