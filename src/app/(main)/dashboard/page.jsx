"use client";
import { useEffect, useState } from "react";
import DashboardCard from "../../../components/getMessages/getMessages";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/get-messages", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || [])); // ✅ adjust to your API shape
  }, []);

  console.log(messages);

  if (messages.length === 0) {
    return <p className="text-red-600  text-2xl text-center mt-10">No messages found</p>;
  }

  return (
    <>
      {messages.map((msg) => (
        <DashboardCard key={msg._id} message={msg} />
      ))}
    </>
  );
}
