"use client";

import React from "react";
import { Button, Link } from "@heroui/react";

export default function CTA() {
  return (
    <section 
      className="w-full bg-[#050505] text-white pt-32 pb-24 px-6 flex flex-col items-center relative overflow-hidden min-h-[60vh]"
      style={{
        backgroundImage: "url('/cta-bg.png')",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto", // Scales the grid dome edge-to-edge perfectly
      }}
    >
      {/* Central Content Stack */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center mt-6 sm:mt-12">
        
        {/* Main Header Statement */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-tight max-w-3xl">
          Your next role is already looking for you
        </h2>

        {/* Subtitle Message */}
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-6 font-normal leading-relaxed tracking-normal px-4">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full px-6 sm:px-0">
          
          {/* Primary Action Button */}
          <Button
            as={Link}
            href="/register"
            className="bg-white hover:bg-zinc-100 text-black font-medium h-12 px-8 rounded-xl text-sm transition-all w-full sm:w-auto shadow-lg shadow-white/5"
          >
            Create a free account
          </Button>

          {/* Secondary Action Button */}
          <Button
            as={Link}
            href="/pricing"
            variant="bordered"
            className="border-zinc-800 bg-[#0c0c0e]/40 backdrop-blur-md hover:border-zinc-700 text-zinc-300 hover:text-white font-medium h-12 px-8 rounded-xl text-sm transition-all w-full sm:w-auto"
          >
            View pricing
          </Button>

        </div>
      </div>
    </section>
  );
}