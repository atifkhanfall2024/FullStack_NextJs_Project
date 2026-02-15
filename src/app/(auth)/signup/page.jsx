'use client'
import Image from "next/image";
import { useState } from "react";
import axios from 'axios'
export default function SignupPage() {

const [userName , setuserName] = useState('')
const [email , setEmail] = useState('')
const [password , setPassword] = useState('')


const HandleSignup = async(e)=>{
             e.preventDefault()
             try{
         const res = await axios.post('/api/signup' , {
          UserName:userName  , email , password
         } , {withCredentials:true})
         console.log(res.data.message);
             }catch(err){
                 console.log(err);
             }
}



  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT: Image panel */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0">
                <Image
                  src="/1 (2).png"
                  alt="Mystery Messages"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* overlay for readability / premium look */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />

              <div className="relative flex h-full flex-col justify-end p-10">
                <p className="text-sm font-medium text-white/80">
                  Anonymous • Secure • Fun
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
                  Mystery Messages
                </h2>
                <p className="mt-2 max-w-sm text-sm text-white/80">
                  Create an account and start receiving anonymous messages from
                  anyone.
                </p>
              </div>
            </div>

            {/* RIGHT: Form panel */}
            <div className="flex items-center justify-center p-6 sm:p-10">
              <div className="w-full max-w-md">
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Join Mystery Message
                  </h1>
                  <p className="mt-2 text-sm text-slate-600">
                    Sign up to start your anonymous adventure
                  </p>
                </div>

                <form className="mt-8 space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">
                      Username
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e)=>setuserName(e.target.value)}
                      placeholder="yourname"
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">
                      Email
                    </label>
                    <input
                      type="email"
                          value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">
                      Password
                    </label>
                    <input
                        value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      type="password"
                      placeholder="••••••••"
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <button
                    type="button"
                    className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]" onClick={HandleSignup}
                  >
                    Create account
                  </button>

                  <p className="pt-2 text-center text-sm text-slate-700">
                    Already a member?{" "}
                    <a
                      href="#"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Sign in
                    </a>
                  </p>
                </form>

                {/* mobile image preview (optional) */}
                <div className="mt-10 lg:hidden">
                  <div className="relative h-56 overflow-hidden rounded-2xl ring-1 ring-black/5">
                    <Image
                      src="/1 (2).png"
                      alt="Mystery Messages"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* tiny footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          By signing up, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
