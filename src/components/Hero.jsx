"use client";

import { motion } from "motion/react"

export default function Hero() {
  const stats = [
    {
      id: 1,
      value: "50K",
      label: "Active Jobs",
      icon: (
        <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H5.625a2.25 2.25 0 00-2.25 2.25m16.5 0v-1.35A2.25 2.25 0 0017.25 8.25h-2.31a1.125 1.125 0 01-.795-.33L13.14 6.92a1.125 1.125 0 00-.795-.33H11.65c-.3 0-.587.12-.795.33L9.856 7.92a1.125 1.125 0 01-.795.33H6.75a2.25 2.25 0 00-2.25 2.55v1.35m16.5 0H3.675" />
        </svg>
      ),
    },
    {
      id: 2,
      value: "12K",
      label: "Companies",
      icon: (
        <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75H21m-3.75 3.75H21" />
        </svg>
      ),
    },
    {
      id: 3,
      value: "2M",
      label: "Job Seekers",
      icon: (
        <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 4,
      value: "97%",
      label: "Satisfaction Rate",
      icon: (
        <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.173-.362.682-.362.855 0l2.425 4.906a1 1 0 00.753.546l5.419.784c.402.059.564.553.27.839l-3.92 3.821a1 1 0 00-.272.84l.926 5.4a1 1 0 01-1.451 1.054l-4.838-2.542a1 1 0 00-.94 0l-4.838 2.542a1 1 0 01-1.451-1.054l.926-5.4a1 1 0 00-.272-.84l-3.92-3.821a1 1 0 01.27-.839l5.419-.784a1 1 0 00.753-.546l2.425-4.906z" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      className="w-full bg-[#050505] text-white pt-24 pb-20 px-6 flex flex-col items-center min-h-[75vh]"
      style={{
        backgroundImage: "url('/globe.png')",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto", // Forces image to span 100% width and grow downward
      }}
    >
      {/* Content Stack */}
      <div className="w-full max-w-6xl flex flex-col items-center text-center mt-12 sm:mt-24 md:mt-32">
        
        {/* Main Heading Statement */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-zinc-300 max-w-3xl leading-tight tracking-tight px-4">
          Assisting over <span className="font-medium text-white">15,000 job seekers</span> find their dream positions.
        </h2>
        <br />
        <motion.p  animate={{ rotate: 360 }}>Remote Jobs</motion.p>
        <motion.p initial={{ scale: .2 }} animate={{ scale: 1 }}>Onsite Jobs</motion.p>

        {/* Stats Grid Layout */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-24 md:mt-36">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#0b0b0b]/90 backdrop-blur-md border border-zinc-900/80 rounded-2xl p-6 md:p-8 flex flex-col items-start text-left h-44 justify-between transition-all duration-300 hover:border-zinc-800/50 shadow-2xl"
            >
              {/* Icon Holder */}
              <div className="p-2 bg-zinc-900/60 border border-zinc-800/40 rounded-lg">
                {stat.icon}
              </div>

              {/* Data & Label */}
              <div className="flex flex-col gap-1 mt-4">
                <span className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-zinc-500 font-medium">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}