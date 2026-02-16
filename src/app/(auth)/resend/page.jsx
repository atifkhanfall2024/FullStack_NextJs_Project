'use client';

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function ResendOtpPage() {
  const route = useRouter()
    const [email , setEmail] = useState('')
    const [loading , setLoading] = useState(false)

    const ResendOtp = async(e)=>{
               e.preventDefault()
                 setLoading(true)
               try {

              const res = await axios.post('/api/resend-otp' , {email} , {withCredentials:true})
              toast.success(res?.data?.message || 'Otp Send Success')
              route.push('/VerifyOtp')
              
               } catch (error) {
                setLoading(false)
                toast.error(error?.response?.data?.message || error?.response?.data?.error || "SomeThing Went Wrong")
                console.log(error?.response?.data?.message);
               }
    }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT: Info panel */}
            <div className="relative hidden lg:flex flex-col justify-between bg-slate-900 p-10">
              <div>
                <p className="text-sm font-medium text-white/70">
                  Trouble verifying?
                </p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
                  Resend OTP
                </h1>
                <p className="mt-3 max-w-sm text-sm text-white/70">
                  Enter your email address and we’ll send you a new 6-digit
                  verification code.
                </p>
              </div>

              <div className="mt-10 rounded-2xl bg-white/10 p-5 ring-1 ring-white/10">
                <p className="text-sm text-white/80">
                  Tip: Check your spam/junk folder too.
                </p>
              </div>
            </div>

            {/* RIGHT: Form panel */}
            <div className="flex items-center justify-center p-6 sm:p-10">
              <div className="w-full max-w-md">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Resend verification code
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Enter your email to receive a new OTP.
                  </p>
                </div>

                <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                  <form className="space-y-5">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-900">
                        Email address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    {/* Button */}
                    <button
                      type="button"
                      className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]" onClick={ResendOtp} disabled={loading}
                    >
                     {loading ? <ClipLoader size={30} color="#fff"/>:"Resend OTP"} 
                    </button>

                    {/* Back to verify / login */}
                    <p className="pt-2 text-center text-sm text-slate-700">
                      Remembered your code?{" "}
                      <Link
                        href="/VerifyOtp"
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        Go to verification
                      </Link>
                    </p>
                  </form>
                </div>

                <p className="mt-6 text-center text-xs text-slate-500">
                  By continuing, you agree to our Terms & Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
