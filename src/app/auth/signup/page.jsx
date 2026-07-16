"use client";

import React, { useState } from "react";
import { Input as HeroInput, Button, Link } from "@heroui/react";
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await authClient.signUp.email({
        email,
        password,
        name,
        // Better Auth uses this to redirect automatically on success
        callbackURL: "/", 
      }, {
        onRequest: () => setLoading(true),
        onError: (ctx) => {
          setError(ctx.error.message || "An authentication error occurred.");
          setLoading(false);
        },
        onSuccess: () => {
          setLoading(false);
          setSuccessMessage("Account created successfully! Redirecting...");
          
          // Fallback manual routing trigger if callbackURL execution waits on session initialization
          setTimeout(() => {
            router.push("/");
          }, 1500);
        }
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const PasswordToggleIcon = ({ isVisible, toggle }) => (
    <button 
      type="button" 
      onClick={toggle} 
      className="focus:outline-none p-1 rounded-md hover:bg-zinc-900/60 transition-colors flex items-center justify-center relative z-20"
      aria-label="toggle password visibility"
    >
      {isVisible ? (
        <svg className="w-5 h-5 text-zinc-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-zinc-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )}
    </button>
  );

  return (
    <main className="w-full min-h-[90vh] bg-[#050505] text-white px-6 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Floating Dynamic Success Toast Alert */}
      {successMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 border border-emerald-500/30 text-emerald-400 text-sm py-3.5 px-5 rounded-xl shadow-xl shadow-black/50 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Card Interface Wrapper */}
      <div className="relative z-10 w-full max-w-md bg-[#0a0a0c]/60 backdrop-blur-xl border border-zinc-900/80 p-8 rounded-2xl shadow-2xl flex flex-col gap-6">
        
        {/* Header Block */}
        <div className="flex flex-col gap-1.5 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-100">
            Create an account
          </h1>
          <p className="text-sm text-zinc-500 font-normal">
            Join hireloop to start scaling your career trajectory.
          </p>
        </div>

        {/* Error Feedback Node */}
        {error && (
          <div className="bg-red-950/30 border border-red-900/50 text-red-400 text-xs py-2.5 px-4 rounded-xl font-medium animate-in fade-in duration-200">
            {error}
          </div>
        )}

        {/* Input Interactive Form Stack */}
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          
          {/* Full Name Input */}
          <HeroInput
            type="text"
            label="Name"
            placeholder="Enter your name"
            labelPlacement="outside"
            variant="bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
            classNames={{
              inputWrapper: "border-zinc-800 hover:border-zinc-700 focus-within:!border-zinc-600 bg-zinc-900/20 h-11 rounded-xl transition-all",
              label: "text-zinc-400 text-xs font-medium pb-1",
              input: "text-sm text-zinc-200 placeholder:text-zinc-600",
            }}
          />

          {/* Email Address Input */}
          <HeroInput
            type="email"
            label="Email"
            placeholder="you@example.com"
            labelPlacement="outside"
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            classNames={{
              inputWrapper: "border-zinc-800 hover:border-zinc-700 focus-within:!border-zinc-600 bg-zinc-900/20 h-11 rounded-xl transition-all",
              label: "text-zinc-400 text-xs font-medium pb-1",
              input: "text-sm text-zinc-200 placeholder:text-zinc-600",
            }}
          />

          {/* Password Input Field */}
          <HeroInput
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Create a strong password"
            labelPlacement="outside"
            variant="bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            classNames={{
              inputWrapper: "border-zinc-800 hover:border-zinc-700 focus-within:!border-zinc-600 bg-zinc-900/20 h-11 rounded-xl transition-all",
              label: "text-zinc-400 text-xs font-medium pb-1",
              input: "text-sm text-zinc-200 placeholder:text-zinc-600",
            }}
            endContent={
              <PasswordToggleIcon isVisible={showPassword} toggle={togglePasswordVisibility} />
            }
          />

          {/* Confirm Password Input Field */}
          <HeroInput
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm Password"
            placeholder="Verify your password"
            labelPlacement="outside"
            variant="bordered"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            classNames={{
              inputWrapper: "border-zinc-800 hover:border-zinc-700 focus-within:!border-zinc-600 bg-zinc-900/20 h-11 rounded-xl transition-all",
              label: "text-zinc-400 text-xs font-medium pb-1",
              input: "text-sm text-zinc-200 placeholder:text-zinc-600",
            }}
            endContent={
              <PasswordToggleIcon isVisible={showConfirmPassword} toggle={toggleConfirmPasswordVisibility} />
            }
          />

          {/* Form Submit Action Button */}
          <Button
            type="submit"
            isLoading={loading}
            disabled={!!successMessage}
            className="bg-white hover:bg-zinc-100 text-black font-medium h-11 rounded-xl text-sm transition-all mt-3 shadow-lg shadow-white/5 disabled:opacity-50"
          >
            Sign up
          </Button>
        </form>

        {/* Alternate Redirect Footer Options */}
        <div className="text-center text-xs text-zinc-500 font-normal mt-1">
          Already have an account?{" "}
          <Link href="/login" className="text-zinc-300 hover:text-white transition-colors text-xs font-medium underline underline-offset-4">
            Sign in
          </Link>
        </div>

      </div>
    </main>
  );
}