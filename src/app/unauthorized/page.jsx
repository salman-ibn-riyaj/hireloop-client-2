'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ShieldAlert, 
  ArrowLeft, 
  Home, 
  KeyRound, 
  Lock, 
  ChevronRight 
} from 'lucide-react';

export default function UnauthorizedPage() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 font-sans text-slate-100 antialiased selection:bg-rose-500 selection:text-white">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-rose-600/20 to-violet-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-600/15 to-rose-600/15 blur-[120px] pointer-events-none" />
      
      {/* Micro Grid Overlay Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      {/* Main Glassmorphic Container */}
      <main className="relative z-10 w-full max-w-lg px-6 py-12">
        <div className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-slate-700/80">
          
          {/* Status Badge */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-6 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
              </span>
              401 / 403 Forbidden Access
            </div>
            <Lock className="h-4 w-4 text-slate-500" />
          </div>

          {/* Visual Hero Icon */}
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400 shadow-inner">
            <ShieldAlert className="h-8 w-8" />
          </div>

          {/* Core Content */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-3">
            Access Restricted
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            You don't have the required authorization or credentials to view this resource. Please log in with an elevated account or contact your system administrator.
          </p>

          {/* Technical Context Block */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 mb-8 font-mono text-xs">
            <div className="flex justify-between items-center text-slate-500 mb-1">
              <span>Attempted Path:</span>
              <span className="text-rose-400/80">UNAUTHORIZED</span>
            </div>
            <div className="text-slate-300 truncate font-semibold">
              {pathname || '/restricted-route'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition-all duration-200 hover:bg-rose-500 active:scale-[0.98]"
            >
              <KeyRound className="h-4 w-4" />
              Sign In with Authorized Account
              <ChevronRight className="h-4 w-4 ml-auto opacity-70" />
            </Link>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Go Back
              </button>

              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Home className="h-3.5 w-3.5" />
                Return Home
              </Link>
            </div>
          </div>

          {/* Footer Note */}
          <p className="mt-8 text-center text-xs text-slate-600">
            Security ID: <span className="font-mono text-slate-500">ERR_AUTH_LEVEL_INSUFFICIENT</span>
          </p>

        </div>
      </main>
    </div>
  );
}