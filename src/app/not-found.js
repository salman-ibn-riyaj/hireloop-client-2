"use client";

import React from "react";
import { Button, Link } from "@heroui/react";

export default function NotFound() {
  return (
    <main className="w-full min-h-[85vh] bg-[#050505] text-white px-6 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Premium Radial Glow - Creates a beautiful focal spot without images */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Content Container */}
      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center gap-6">
        
        {/* Large 404 Status Code */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700 select-none">
          404
        </h1>

        {/* Informative Header */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-200 tracking-tight px-2">
          This loop seems to be broken.
        </h2>

        {/* Explanatory Paragraph */}
        <p className="text-sm sm:text-base text-zinc-500 max-w-md leading-relaxed px-4">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
        </p>

        {/* Action Button Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center px-6 sm:px-0">
          {/* Main Action */}
          <Link
            
            href="/"
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium px-8 h-12 rounded-xl shadow-xl shadow-indigo-600/20 text-sm transition-all w-full sm:w-auto"
          >
            Back to Home
          </Link>

          {/* Secondary Action */}
          <Button
            as={Link}
            href="/jobs"
            variant="bordered"
            className="border-zinc-900 bg-zinc-900/20 hover:border-zinc-800 text-zinc-300 hover:text-white font-medium px-8 h-12 rounded-xl text-sm transition-all w-full sm:w-auto"
          >
            Browse Jobs
          </Button>
        </div>
      </div>
    </main>
  );
}