"use client";

import React from "react";
import { Link } from "@heroui/react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-zinc-400 font-sans border-t border-zinc-900/80">
      {/* Top Section: Branding & Links */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-6">
        
        {/* Left Column: Brand Bio */}
        <div className="md:col-span-2 flex flex-col gap-4 max-w-sm">
          <Link href="/">
            <Image
              src="/logo.png" 
              alt="hireloop logo"
              width={140}
              height={36}
              className="object-contain"
            />
          </Link>
          <p className="text-zinc-500 text-sm leading-relaxed mt-2">
            The AI-native career platform. Built for people who take their work seriously.
          </p>
        </div>

        {/* Column 2: Product Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-indigo-500 font-semibold text-sm tracking-wider">Product</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link href="/jobs" className="text-zinc-400 hover:text-white transition-colors">Job discovery</Link></li>
            <li><Link href="/ai" className="text-zinc-400 hover:text-white transition-colors">Worker AI</Link></li>
            <li><Link href="/companies" className="text-zinc-400 hover:text-white transition-colors">Companies</Link></li>
            <li><Link href="/salary" className="text-zinc-400 hover:text-white transition-colors">Salary data</Link></li>
          </ul>
        </div>

        {/* Column 3: Navigations Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-indigo-500 font-semibold text-sm tracking-wider">Navigations</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link href="/help" className="text-zinc-400 hover:text-white transition-colors">Help center</Link></li>
            <li><Link href="/library" className="text-zinc-400 hover:text-white transition-colors">Career library</Link></li>
            <li><Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Column 4: Resources Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-indigo-500 font-semibold text-sm tracking-wider">Resources</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link href="/guidelines" className="text-zinc-400 hover:text-white transition-colors">Brand Guideline</Link></li>
            <li><Link href="/newsroom" className="text-zinc-400 hover:text-white transition-colors">Newsroom</Link></li>
          </ul>
        </div>
      </div>

      {/* Thin separation border */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full h-[1px] bg-zinc-900" />
      </div>

      {/* Bottom Section: Socials & Copyright */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
        
        {/* Social Media Rounded Boxes */}
        <div className="flex items-center gap-3">
          {/* Facebook */}
          <a href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-all border border-zinc-800/40">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
            </svg>
          </a>
          
          {/* Pinterest / Custom Icon */}
          <a href="#" aria-label="Pinterest" className="w-9 h-9 flex items-center justify-center bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg transition-all border border-indigo-500/20">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.27 2.68 7.91 6.46 9.35-.09-.8-.17-2.03.04-2.91.19-.79 1.24-5.27 1.24-5.27s-.32-.63-.32-1.57c0-1.47.85-2.57 1.91-2.57.9 0 1.34.68 1.34 1.49 0 .91-.58 2.27-.88 3.53-.25 1.05.52 1.91 1.55 1.91 1.86 0 3.29-1.96 3.29-4.79 0-2.5-1.8-4.25-4.36-4.25-2.97 0-4.71 2.23-4.71 4.53 0 .9.35 1.86.78 2.38.09.1.1.19.07.31-.08.33-.25 1.01-.28 1.15-.04.18-.14.22-.33.13-1.25-.58-2.03-2.42-2.03-3.89 0-3.17 2.3-6.08 6.64-6.08 3.49 0 6.2 2.49 6.2 5.81 0 3.47-2.19 6.26-5.23 6.26-1.02 0-1.98-.53-2.31-1.16l-.63 2.4c-.23.88-.85 1.99-1.27 2.66C10.57 21.87 11.27 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
            </svg>
          </a>
          
          {/* LinkedIn */}
          <a href="#" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-all border border-zinc-800/40">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>
        </div>

        {/* Right Stack: Legals & Programming Hero Credits */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-zinc-600 text-center sm:text-right">
          <p>Copyright 2026 — Salman Shah</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Terms & Policy</Link>
            <span>-</span>
            <Link href="/privacy" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Privacy Guideline</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}