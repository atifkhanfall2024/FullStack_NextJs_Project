"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function AcceptMessages() {
  const [on, setOn] = useState(false);
  const [loading, setLoading] = useState(true); // for initial load
   
  // ✅ Load current status from backend
  useEffect(() => {
    const loadStatus = async () => {
      try {
        const res = await axios.get("/api/accept-messages", {
          withCredentials: true,
        });

        // backend returns: { message: true/false }
        setOn(Boolean(res?.data?.message));
      } catch (err) {
        console.log(err?.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStatus();
  }, []);

  // ✅ Update status in backend
  const updateStatus = async (value) => {
    try {
      setOn(value); // instant UI change
      await axios.post(
        "/api/accept-messages",
        { Userstatus: value }, // ✅ matches your backend
        { withCredentials: true }
      );

      toast.success(value ? "Accepting messages ON" : "Accepting messages OFF");
    } catch (err) {
      console.log(err?.response?.data || err.message);
      toast.error("Failed to update status");
      setOn((p) => !p); // rollback UI if API fails
    }
  };

  if (loading) {
    return (
      <div className="w-28 h-10 rounded-full border border-white/10 bg-slate-800 animate-pulse" />
    );
  }

  return (
     <>
      <div><p className="text-black -translate-y-[200%] ml-[3%] text-[110%]">Accepting Message:{on}</p></div>
    <button
      type="button"
      onClick={() => updateStatus(!on)}
      className="relative w-25 h-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden -translate-y-[200%] ml-[16%]"
    >  
      <span
        className={`absolute top-1 left-1 h-8 w-1/2 rounded-full transition ${
          on ? "translate-x-[52px] bg-emerald-500" : "translate-x-0 bg-red-500"
        }`}
      />
       
      <div className="relative z-10 flex h-full items-center justify-between px-3 text-xs font-bold text-white">
       
        <span
          className={`${on ? "opacity-60" : "opacity-100"} cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation(); // ✅ stop button click
            updateStatus(false);
          }}
        >
          OFF
        </span>

        <span
          className={`${on ? "opacity-100" : "opacity-60"} cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation(); // ✅ stop button click
            updateStatus(true);
          }}
        >
          ON
        </span>
       
      </div>
    </button>
    
   </>
  );
}
