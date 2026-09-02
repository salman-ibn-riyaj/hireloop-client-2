'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const [userType, setUserType] = useState('seeker'); // 'seeker' | 'recruiter'
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const seekerPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Essential tools for casual job searching and getting started.',
      badge: null,
      isPopular: false,
      features: [
        'Browse & save up to 10 jobs',
        'Apply to up to 3 jobs per month',
        'Basic profile customization',
        'Standard email job alerts',
      ],
      buttonText: 'Get Started Free',
      buttonHref: '/auth/signup?plan=seeker-free',
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'Designed for active candidates targeting consistent interviews.',
      badge: 'Most Popular',
      isPopular: true,
      features: [
        'Apply to up to 30 jobs per month',
        'Unlimited saved jobs',
        'Real-time application tracking',
        'Detailed salary insights & analytics',
        'Direct messaging with recruiters',
      ],
      buttonText: 'Upgrade to Pro',
      buttonHref: '/checkout?plan=seeker-pro',
    },
    {
      name: 'Premium',
      price: '$39',
      period: 'per month',
      description: 'Maximum exposure and tools to fast-track your executive career.',
      badge: 'Best Value',
      isPopular: false,
      features: [
        'Everything in Pro',
        'Unlimited job applications',
        'Profile boost to hiring recruiters',
        'Early access to newly posted jobs',
        '24/7 Priority customer support',
      ],
      buttonText: 'Get Premium Access',
      buttonHref: '/checkout?plan=seeker-premium',
    },
  ];

  const recruiterPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: "Ideal for a company's initial hire or trial recruitment.",
      badge: null,
      isPopular: false,
      features: [
        'Up to 3 active job posts',
        'Basic applicant management',
        'Standard job listing visibility',
        'Great for first year hiring',
      ],
      buttonText: 'Post a Job Free',
      buttonHref: '/auth/signup?plan=recruiter-free',
    },
    {
      name: 'Growth',
      price: '$49',
      period: 'per month',
      description: 'Perfect for growing teams needing consistent talent pipelines.',
      badge: 'Most Popular',
      isPopular: true,
      features: [
        'Up to 10 active job posts',
        'Applicant tracking system (ATS)',
        'Basic hiring analytics dashboard',
        'Dedicated email support',
        'Candidate export options',
      ],
      buttonText: 'Start Growth Plan',
      buttonHref: '/checkout?plan=recruiter-growth',
    },
    {
      name: 'Enterprise',
      price: '$149',
      period: 'per month',
      description: 'Comprehensive hiring suite for scaling corporations and agencies.',
      badge: 'Full Suite',
      isPopular: false,
      features: [
        'Up to 50 active job posts',
        'Advanced analytics dashboard',
        'Featured job listings',
        'Team collaboration & seat roles',
        'Custom company branding',
        'Priority 24/7 support',
      ],
      buttonText: 'Go Enterprise',
      buttonHref: '/checkout?plan=recruiter-enterprise',
    },
  ];

  const faqs = [
    {
      question: 'Can I change or cancel my plan at any time?',
      answer: 'Yes! You can upgrade, downgrade, or cancel your subscription at any time directly from your account settings. If you cancel, your subscription will remain active until the end of your current billing period.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'We offer a 7-day money-back guarantee on all paid plans. If you are not satisfied with your purchase, contact our support team within 7 days for a full, no-questions-asked refund.',
    },
    {
      question: 'Which payment methods do you support?',
      answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) as well as Apple Pay, Google Pay, and PayPal. Enterprise plans can also be invoiced annually via wire transfer.',
    },
    {
      question: 'What happens when I reach my application or posting limit?',
      answer: 'If you reach your plan limit, you will be prompted to upgrade to a higher tier to continue submitting applications or posting jobs. Your existing data and applications will remain untouched.',
    },
  ];

  const currentPlans = userType === 'seeker' ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Header */}
      <div className="relative pt-12 pb-8 sm:pt-20 sm:pb-12 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            Flexible & Transparent Pricing
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Plans built to empower your <br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              career and hiring goals
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-xl mx-auto">
            Choose the perfect plan tailored for job seekers landing their dream role or recruiters building world-class teams.
          </p>
        </div>

        {/* User Type Switcher Toggle */}
        <div className="relative z-10 mt-8 sm:mt-12 inline-flex items-center p-1.5 rounded-full bg-slate-200/80 dark:bg-zinc-900 border border-slate-300/50 dark:border-zinc-800 backdrop-blur-md shadow-inner">
          <button
            onClick={() => setUserType('seeker')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              userType === 'seeker'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            For Job Seekers
          </button>
          
          <button
            onClick={() => setUserType('recruiter')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              userType === 'recruiter'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            For Recruiters
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {currentPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                plan.isPopular
                  ? 'border-2 border-indigo-500 bg-white dark:bg-zinc-900 shadow-2xl shadow-indigo-500/10 dark:shadow-none scale-100 lg:-translate-y-2'
                  : 'border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md shadow-lg shadow-slate-200/50 dark:shadow-none hover:border-slate-300 dark:hover:border-zinc-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1 text-xs font-bold text-white shadow-md uppercase tracking-wider">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Header Info */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 dark:text-zinc-400 mb-6 min-h-[40px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
                    /{plan.period}
                  </span>
                </div>

                <hr className="border-slate-100 dark:border-zinc-800 mb-6" />

                {/* Feature List */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-zinc-300">
                      <div className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Link
                href={plan.buttonHref}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-center transition-all duration-200 block ${
                  plan.isPopular
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 active:scale-[0.98]'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-900 dark:text-white active:scale-[0.98]'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 sm:mt-28 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-zinc-400">
              Everything you need to know about billing, plans, and account management.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span className="text-base pr-4">{faq.question}</span>
                    <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-zinc-800/60 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}