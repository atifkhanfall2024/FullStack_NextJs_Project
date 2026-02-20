"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [suggestedMessages, setSuggestedMessages] = useState([]);

  const handleSend = async(e) => {
   
           e.preventDefault()
           try {

            const res = await axios.post('/api/send-message' ,{UserName:username ,Context:message })
            toast.success(res?.data?.message)
            setShowModal(false); 
           } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error.message);
            setShowModal(false); 
           }

       // close modal after sending
    
  };

  const handleSuggest = async(e) => {
             e.preventDefault()
             try {
              const res = await axios.post('/api/suggest-messages' , {} ,{withCredentials:true})
              setSuggestedMessages(res.data || [])
             } catch (error) {
              console.log(error);
             }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Platform Heading */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-purple-700">Mystery Messages</h1>
        <p className="text-gray-600 text-lg">
          Discover secrets, send whispers, or get AI-suggested messages
        </p>
      </div>

      {/* Suggest Messages Section */}
      <div className="bg-slate-200 shadow rounded p-4">
        <h2 className="text-2xl font-semibold mb-2">Suggest Messages</h2>
        <p className="text-gray-500 mb-4">
          Click the button below to get mysterious message suggestions from AI
        </p>
        <button
          onClick={handleSuggest}
          className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition"
        >
          Suggest Messages with AI
        </button>

        {/* Suggested Messages Card */}
        {Array.isArray(suggestedMessages) && suggestedMessages.length > 0  && (
          <div className="mt-4 space-y-2">
            {suggestedMessages.slice(0, 5).map((msg, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded px-3 py-2 bg-gray-50"
              >
                {msg}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Send Message Button */}
      <div className="text-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Send Your Message
        </button>
      </div>

      {/* Sent Messages Display */}
      {messages.length > 0 && (
        <div className="bg-white shadow rounded p-4 space-y-2">
          <h2 className="text-2xl font-semibold">Sent Messages</h2>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded px-3 py-2 bg-gray-50"
            >
              <span className="font-semibold">{msg.username}:</span> {msg.message}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 space-y-4 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold">Send Your Message</h2>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full"
            >
              Send Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
