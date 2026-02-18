"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
export default function DashboardCard({ message , onDeleted}) {
  const [open, setOpen] = useState(false);
  const [IsRemove , setIsRemove] = useState()
  //console.log(key);
  const DeleteMsg = async(e)=>{
     e.preventDefault()

     try {
      
      const res = await axios.delete(`/api/delete-messages/${message?._id}` , {} , {withCredentials:true})

        console.log("Delete SUccess");
        
        setOpen(false)
        onDeleted(message?._id)
       
     } catch (error) {
       console.log(error);
     }

  }

  return (
    <div className="relative w-full max-w-sm">
      {/* Card */}
      <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4 shadow hover:bg-black transition">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-xl font-medium text-white line-clamp-2">
            {message?.Context || "No content"}
          </p>

          <button
            onClick={() => setOpen(true)}
            className="text-slate-400 hover:text-red-500"
            aria-label="Delete"
          >
            <IoClose size={28} />
          </button>
        </div>

        {/* Date */}
        <p className="mt-2 text-xs text-green-400">
          {message?.CreatedAt
            ? new Date(message.CreatedAt).toLocaleString()
            : "Just now"}
        </p>
      </div>

      {/* Small popup */}
      {open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-full max-w-xs rounded-xl border border-white/10 bg-slate-900 p-4 shadow-lg">
            <p className="text-sm text-white">
              Do you really want to delete?
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                 onClick={(DeleteMsg)}
                className="rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600" >
                Delete
                {console.log(message?._id)}
                  {/* {console.log(message?.id)} */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
