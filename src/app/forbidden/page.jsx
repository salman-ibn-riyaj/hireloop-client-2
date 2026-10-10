'use client';

import React from 'react';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export default function Forbidden() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Animated Badge & Icon */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-950/50 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-50 dark:ring-red-900/20">
            <ShieldAlert className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 rounded-full mb-3">
            Error 403
          </span>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
            Access Denied
          </h1>
          
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300 max-w-sm">
            You don't have permission to access this area of <span className="font-semibold text-gray-900 dark:text-white">HiringLoop</span>.
          </p>
        </div>

        {/* Informational Card */}
        <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left text-sm space-y-2 text-gray-600 dark:text-gray-300 shadow-sm">
          <p className="font-medium text-gray-900 dark:text-white">Why am I seeing this?</p>
          <ul className="list-disc list-inside space-y-1 text-xs text-gray-500 dark:text-gray-400">
            <li>You may need a Recruiter or Admin account.</li>
            <li>Your active session might have expired.</li>
            <li>This route is restricted to specific company workspaces.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Home size={18} />
            Back to Home
          </a>

          <button
            onClick={handleGoBack}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 dark:text-gray-500 pt-4">
          Need access? Contact your HiringLoop organization administrator or sign in with another account.
        </p>

      </div>
    </div>
  );
}