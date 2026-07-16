"use client";

import React, { useState } from "react";
import { Link, Button } from "@heroui/react";
import Image from "next/image";

export default function HireloopNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[#121212] py-4 px-4 sm:px-6 flex flex-col items-center relative z-50">
      {/* Main Navbar Container */}
      <nav className="w-full max-w-6xl bg-[#1a1a1a]/80 backdrop-blur-md border border-zinc-800/50 rounded-2xl h-16 shadow-2xl flex items-center justify-between px-6">
        
        {/* Left: Brand/Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png" 
              alt="hireloop logo"
              width={120}
              height={32}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation (Hidden on Mobile, flex on md screens and up) */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/jobs" 
            className="text-zinc-300 hover:text-white text-sm font-medium transition-colors"
          >
            Browse Jobs
          </Link>
          
          <Link 
            href="/company" 
            className="text-zinc-300 hover:text-white text-sm font-medium transition-colors"
          >
            Company
          </Link>
          
          <Link 
            href="/pricing" 
            className="text-zinc-300 hover:text-white text-sm font-medium transition-colors"
          >
            Pricing
          </Link>

          {/* Divider */}
          <div className="h-4 w-[1px] bg-zinc-700 mx-1" />

          {/* Sign In Link */}
          <Link 
            href="/login" 
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
          >
            Sign In
          </Link>

          {/* Get Started Button */}
          <Link
            
            href="/auth/signup"
            className=" px-5 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium px-5 rounded-xl shadow-lg shadow-indigo-600/20 text-sm transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger Button (Hidden on Desktop) */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-zinc-400 hover:text-white focus:outline-none p-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              // Close (X) Icon
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu Drawer */}
      {isOpen && (
        <div className="w-full max-w-6xl mt-2 bg-[#1a1a1a] border border-zinc-800/80 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 md:hidden transition-all duration-200">
          <Link 
            href="/jobs" 
            onClick={() => setIsOpen(false)}
            className="text-zinc-300 hover:text-white text-base font-medium py-2 border-b border-zinc-800/50"
          >
            Browse Jobs
          </Link>
          <Link 
            href="/company" 
            onClick={() => setIsOpen(false)}
            className="text-zinc-300 hover:text-white text-base font-medium py-2 border-b border-zinc-800/50"
          >
            Company
          </Link>
          <Link 
            href="/pricing" 
            onClick={() => setIsOpen(false)}
            className="text-zinc-300 hover:text-white text-base font-medium py-2"
          >
            Pricing
          </Link>

          <div className="border-t border-zinc-800 my-2" />

          <div className="flex flex-col gap-3">
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="text-indigo-400 hover:text-indigo-300 text-base font-medium text-center py-2"
            >
              Sign In
            </Link>
            <Button
              as={Link}
              href="/register"
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium w-full h-11 rounded-xl shadow-lg shadow-indigo-600/10 text-sm"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}