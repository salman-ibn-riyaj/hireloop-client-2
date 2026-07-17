"use client";

import React, { useState } from "react";
import { Button, Link } from "@heroui/react";
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";
import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export default function SignUp() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("seeker"); // Default role is 'seeker'

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
        role,
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

  // Modern Eye & Eyelash toggle icon component
  const PasswordToggleIcon = ({ isVisible, toggle }) => (
    <button 
      type="button" 
      onClick={toggle} 
      className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none p-1 rounded-md hover:bg-zinc-900/60 transition-colors flex items-center justify-center z-20"
      aria-label="toggle password visibility"
    >
      {isVisible ? (
        // Eyelash / Eye Slash Icon
        <svg className="w-5 h-5 text-zinc-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
      ) : (
        // Standard Eye Icon
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
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 border border-emerald-500/30 text-emerald-400 text-sm py-3.5 px-5 rounded-xl shadow-xl shadow-black/50 flex items-center gap-3">
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
          <div className="bg-red-950/30 border border-red-900/50 text-red-400 text-xs py-2.5 px-4 rounded-xl font-medium">
            {error}
          </div>
        )}

        {/* Input Interactive Form Stack */}
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          
          {/* Full Name Input */}
          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-xs font-medium pb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none bg-zinc-900/20 h-11 px-3 rounded-xl text-sm text-zinc-200 placeholder:text-zinc-600 transition-all"
            />
          </div>

          {/* Email Address Input */}
          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-xs font-medium pb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none bg-zinc-900/20 h-11 px-3 rounded-xl text-sm text-zinc-200 placeholder:text-zinc-600 transition-all"
            />
          </div>

          {/* Password Input Field */}
          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-xs font-medium pb-1">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none bg-zinc-900/20 h-11 pl-3 pr-10 rounded-xl text-sm text-zinc-200 placeholder:text-zinc-600 transition-all"
              />
              <PasswordToggleIcon isVisible={showPassword} toggle={togglePasswordVisibility} />
            </div>
          </div>

          

          {/* Confirm Password Input Field */}
          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-xs font-medium pb-1">Confirm Password</label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Verify your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none bg-zinc-900/20 h-11 pl-3 pr-10 rounded-xl text-sm text-zinc-200 placeholder:text-zinc-600 transition-all"
              />
              <PasswordToggleIcon isVisible={showConfirmPassword} toggle={toggleConfirmPasswordVisibility} />
            </div>
          </div>

          {/* Role Selection Dropdown */}
          <div className="flex flex-col gap-4">
      <Label>Select Role</Label>
      <RadioGroup onChange={value => setRole(value)} defaultValue="seeker" name="role" orientation="horizontal">
        <Radio value="seeker">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            Seeker
          </Radio.Content>
         
        </Radio>
        <Radio value="Recruiter">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            Recruiter
          </Radio.Content>
         
        </Radio>
        
      </RadioGroup>
    </div>

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