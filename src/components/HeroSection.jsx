"use client";

import React, { useState } from "react";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery, "in:", locationQuery);
    // Add your search routing logic here
  };

  return (
    <section className="w-full min-h-[85vh] bg-[#050505] text-white px-6 flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* Premium Background Glow effects */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none z-0" />

      {/* Decorative Subtle Star/Particle Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6 sm:gap-8">
        
        {/* 1. Top Capsule Badge with glowing baseline */}
        <div className="relative flex items-center justify-center w-full">
          {/* Subtle horizontal baseline flare */}
          <div className="absolute w-[200px] sm:w-[350px] h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent top-1/2 -translate-y-1/2" />
          
          <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 shadow-xl shadow-black/40">
            <span className="text-sm">💼</span>
            <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
              <span className="text-zinc-100 font-semibold font-mono">50,000+</span> New Jobs This Month
            </p>
          </div>
        </div>

        {/* 2. Main Title & Subtitle Group */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.15]">
            Find Your Dream Job Today
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-xl mx-auto">
            HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
          </p>
        </div>

        {/* 3. Combined Search Bar Interface */}
        <form 
          onSubmit={handleSearchSubmit}
          className="w-full max-w-3xl bg-[#0a0a0c]/80 border border-zinc-800/80 rounded-2xl p-2 flex flex-col sm:flex-row items-center gap-2 sm:gap-0 shadow-2xl shadow-black/80 backdrop-blur-xl transition-all focus-within:border-zinc-700"
        >
          {/* Left Segment: Job Title Query */}
          <div className="w-full flex items-center gap-3 px-3 py-2 sm:py-0">
            <svg className="w-5 h-5 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Job title, skill or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none h-9"
            />
          </div>

          {/* Vertical Separator Divider Line (Hidden on mobile) */}
          <div className="hidden sm:block w-[1px] h-8 bg-zinc-800/80 mx-2" />

          {/* Right Segment: Location Query & Button */}
          <div className="w-full flex items-center gap-3 px-3 py-2 sm:py-0 relative">
            <svg className="w-5 h-5 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Location or Remote"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none h-9 pr-12"
            />

            {/* Indigo Search Submit Button */}
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 sm:relative sm:right-0 sm:translate-y-0 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white p-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center shrink-0"
              aria-label="Search jobs"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* 4. Trending Tags Node Footer */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-1">
          <span className="text-xs font-normal text-zinc-500">
            Trending Position
          </span>
          <button 
            type="button"
            onClick={() => setSearchQuery("Product Designer")}
            className="text-xs bg-[#121214]/60 hover:bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-full transition-all"
          >
            Product Designer
          </button>
          <button 
            type="button"
            onClick={() => setSearchQuery("AI Engineering")}
            className="text-xs bg-[#121214]/60 hover:bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-full transition-all"
          >
            AI Engineering
          </button>
          <button 
            type="button"
            onClick={() => setSearchQuery("Dev-ops Engineer")}
            className="text-xs bg-[#121214]/60 hover:bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-full transition-all"
          >
            Dev-ops Engineer
          </button>
        </div>

      </div>
    </section>
  );
}