"use client";
import { useEffect, useState } from "react";
import DashboardCard from "../../../components/getMessages/getMessages";
import axios from 'axios'

export default function Dashboard() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
  const getMessage = async()=>{
  try {
      const res = await axios.get('/api/get-messages' , {withCredentials:true})
      setMessages(res?.data?.message)
      //console.log(res?.data);
  } catch (error) {
    console.log(error.message);
  }}

  getMessage()
     
  }, []);

  console.log(messages);

  if (!messages||messages.length===0) {
    return <p className="text-red-600  text-2xl text-center mt-10">No messages found</p>;
  }

  return (
    <>
     <div className="min-h-[calc(100vh-80px)] w-full px-4 py-[20%]">
  <div className="mx-auto max-w-6xl">
    <div className="flex flex-wrap justify-center gap-4">
      {messages.slice(0, 5).map((msg) => (
        <DashboardCard
          key={msg._id}
          message={msg}
          onConfirmDelete={(m) => {
            // 🔴 YOUR delete logic here
            console.log("Delete message:", m._id);
          }}
        />
      ))}
    </div>
  </div>
</div>

    </>
  );
}
