'use client'
import axios from "axios";
import { useState } from "react";

export default function OtpPage() {

const [Otp , setOtp] = useState([])
console.log('my otp' , Otp);
const VerifyOtp = async(e)=>{
             e.preventDefault()
    try {
        const res = await axios.post('/api/verify' ,{
            Otp:Otp.join("") 
    } , {withCredentials:true})
    console.log(res.data);
    } catch (error) {
        console.log(error);
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
                  Verify your account
                </p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
                  Enter your OTP
                </h1>
                <p className="mt-3 max-w-sm text-sm text-white/70">
                  We sent a 6-digit verification code to your email. Enter it
                  below to continue.
                </p>
              </div>

              <div className="mt-10 rounded-2xl bg-white/10 p-5 ring-1 ring-white/10">
                <p className="text-sm text-white/80">
                  Tip: Check your spam/junk folder if you don’t see the email.
                </p>
              </div>
            </div>

            {/* RIGHT: OTP card */}
            <div className="flex items-center justify-center p-6 sm:p-10">
              <div className="w-full max-w-md">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Verification code
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Enter the 6-digit code to verify your email.
                  </p>
                </div>

                <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                  {/* OTP inputs */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <input
                        key={i}
                        value={Otp[i] || []}
                          onChange={(e) => {
      const val = e.target.value.slice(-1); // keep only 1 char
      const next = [...Otp];
      next[i] = val;
      setOtp(next);
    }}
                        inputMode="numeric"
                        maxLength={1}
                        placeholder="•"
                        className="h-12 w-12 rounded-xl border border-slate-200 bg-white text-center text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-300 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    ))}
                  </div>

                  {/* Helper text */}
                  <p className="mt-4 text-center text-xs text-slate-500">
                    Code expires soon. If it expires, request a new one.
                  </p>

                  {/* Actions */}
                  <div className="mt-6 space-y-3">
                    <button
                      type="button"
                      className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"  onClick={VerifyOtp}
                    >
                      Verify
                    </button>

                    <button
                      type="button"
                      className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-900 transition hover:bg-slate-50 active:scale-[0.99]"
                    >
                      Resend code
                    </button>
                  </div>

                  {/* Footer link */}
                  <p className="mt-6 text-center text-sm text-slate-700">
                    Wrong email?{" "}
                    <a
                      href="#"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Change email
                    </a>
                  </p>
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
