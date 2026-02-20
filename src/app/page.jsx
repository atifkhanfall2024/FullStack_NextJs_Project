"use client";
import axios from "axios";
import { get } from "http";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [username , setusername] = useState("")
  const [message , setMessage] = useState('')
  const [User , setUser] = useState(null)


  useEffect(()=>{

    const getUser = async()=>{

    try {
        const res = await axios.get('/api/user' , {withCredentials:true})

           setUser(res?.data?.user)
           console.log(res?.data);
    }
     catch (error) {
      setUser(null)
    }}
      getUser()
  },[])

  const SendMessage = async(e)=>{
             e.preventDefault()
             try {
              
              const res = await axios.post('/api/public-messages' , {UserName:username , Context:message} , {withCredentials:true})
                toast.success(res?.data?.message)
                setShowForm(false)
                setMessage("")
                setusername("")
             } catch (error) {
              toast.error(error?.response?.data?.message)
              console.log(error.message);
             }
  }

  // CAROUSEL AUTO-SCROLL
  useEffect(() => {
    const container = document.getElementById("carousel");
    let scrollAmount = 0;

    const slide = setInterval(() => {
      if (container) {
        container.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });

        scrollAmount += 260;

        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          scrollAmount = 0;
        }
      }
    }, 2500);

    return () => clearInterval(slide);
  }, []);

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-col">

      {/* HEADER */}
      <header className="w-full px-6 py-4 flex justify-between items-center backdrop-blur-lg bg-white/10 shadow-lg">
        <h1 className="text-2xl font-bold tracking-wide">Mystery Messages Hub</h1>
        <div>
          <button className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded-lg mr-2 hover:bg-gray-100">
            {User? <Link href={'/dashboard'}>Dashboard</Link>:<Link href={'/login'}>Login</Link>}
          </button>
         
        </div>
      </header>

      {/* MAIN */}
      <main className="flex flex-col items-center px-4 mt-12">

        {/* INTRO */}
        <h2 className="text-4xl font-bold text-center mb-3 drop-shadow-xl">
          Welcome to the Mystery Messages World 🌙
        </h2>
        <p className="text-center text-white/80 max-w-xl leading-relaxed">
          A magical place where thoughts become whispers, whispers become stories,
          and every message hides a mystery waiting to unfold.
        </p>

        {/* SEND MESSAGE BUTTON */}
        <button
          onClick={() => setShowForm(true)}
          className="mt-10 px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-xl hover:bg-gray-100"
        >
          Send a Message to Login Users
        </button>

        {/* POPUP FORM */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white text-gray-900 p-8 rounded-xl w-full max-w-md shadow-2xl scale-95 animate-[popup_0.3s_ease-out]">
              <h3 className="text-2xl font-semibold mb-5 text-center text-indigo-700">
                Send a Message to Developer
              </h3>

              <input
                type="text"
                value={username}
                onChange={(e)=>setusername(e.target.value)}
                placeholder="Enter username (e.g., atifkhan)"
                className="w-full p-3 border rounded-lg mb-3 bg-gray-100"
              />

              <textarea
                placeholder="Write something..."
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                className="w-full p-3 border rounded-lg h-28 mb-4 bg-gray-100"
              />

              <button className="w-full py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 mb-3" onClick={SendMessage}>
                Send Message
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="w-full py-2 text-indigo-900 underline font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* CAROUSEL */}
        <div className="w-full max-w-3xl mt-16">
          <h3 className="text-2xl font-semibold mb-4 text-white drop-shadow-lg">
            Featured Mystery Messages
          </h3>

          <div
            id="carousel"
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
          >
            {/* CARD 1 */}
            <div className="min-w-[250px] snap-center bg-white/20 backdrop-blur-xl shadow-lg rounded-xl p-5 text-white">
              Every sunrise gives you another chance to rewrite your story.
            </div>

            {/* CARD 2 */}
            <div className="min-w-[250px] snap-center bg-white/20 backdrop-blur-xl shadow-lg rounded-xl p-5 text-white">
              Great things begin with the courage to take the first step.
            </div>

            {/* CARD 3 */}
            <div className="min-w-[250px] snap-center bg-white/20 backdrop-blur-xl shadow-lg rounded-xl p-5 text-white">
              You are one decision away from a completely different life.
            </div>

            {/* CARD 4 */}
            <div className="min-w-[250px] snap-center bg-white/20 backdrop-blur-xl shadow-lg rounded-xl p-5 text-white">
              Sometimes silence speaks louder than words.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* TAILWIND ANIMATION FOR POPUP */
<style jsx>{`
  @keyframes popup {
    0% { opacity: 0; transform: scale(0.85); }
    100% { opacity: 1; transform: scale(1); }
  }
`}</style>
