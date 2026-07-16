"use client";

import React from "react";

export default function Features() {
  const featuresList = [
    {
      id: 1,
      title: "Smart Search",
      description: "Find your ideal job with advanced filters.",
      icon: (
        <svg className="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently.",
      icon: (
        <svg className="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring.",
      icon: (
        <svg className="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75H21m-3.75 3.75H21" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Saved Jobs",
      description: "Manage apps & favorites on your dashboard.",
      icon: (
        <svg className="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: "One-Click Apply",
      description: "Simplify your job applications for an easier process!",
      icon: (
        <svg className="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 9.152c.582.448 1.148.89 1.676 1.345m-6.208-6.03l.244.244c.531.531.972 1.139 1.314 1.808l.453.886a8.113 8.113 0 01.554 4.542l-.129.776a3.39 3.39 0 00.323 2.19l.523.967c.214.394.392.805.53 1.23l.145.443M10.5 18c-3.038 0-5.5-2.462-5.5-5.5S7.462 7 10.5 7 16 9.462 16 12.5 13.538 18 10.5 18z" />
        </svg>
      ),
    },
    {
      id: 6,
      title: "Resume Builder",
      description: "Create professional resumes with modern templates.",
      icon: (
        <svg className="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      id: 7,
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills and experience.",
      icon: (
        <svg className="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9-3l2.25-1.313M12 4.5l-2.25 1.313M12 4.5v2.25m6.75 6.75l-2.25-1.313m2.25 1.313v2.25m0-2.25l-2.25 1.313M3 16.5l2.25-1.313M3 16.5l2.25 1.313M3 16.5v2.25m9 3l2.25-1.313M12 21l-2.25-1.313M12 21v-2.25" />
        </svg>
      ),
    },
    {
      id: 8,
      title: "Career Growth Resources",
      description: "Boost your career with quick interview tips.",
      icon: (
        <svg className="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#050505] text-white py-20 px-6 sm:px-12 flex flex-col items-center select-none">
      
      {/* Upper Tagline */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-xs"></span>
        <span className="text-xs tracking-[0.2em] font-medium text-zinc-400 uppercase">
          Features Job
        </span>
        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-xs"></span>
      </div>

      {/* Header Headline */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-center text-white tracking-tight leading-tight max-w-2xl mb-16 sm:mb-24">
        Everything you need to succeed
      </h2>

      {/* Grid Layout Container */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {featuresList.map((feature) => (
          <div key={feature.id} className="flex items-start gap-4 group">
            
            {/* Boxed Icon Element */}
            <div className="flex-shrink-0 w-14 h-14 bg-[#0a0a0a] border border-zinc-900 rounded-xl flex items-center justify-center shadow-xl transition-colors duration-300 group-hover:border-zinc-800">
              {feature.icon}
            </div>

            {/* Feature Description Content */}
            <div className="flex flex-col gap-1.5 pt-1">
              <h3 className="text-base font-medium text-zinc-100 tracking-tight group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-normal font-normal">
                {feature.description}
              </p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}