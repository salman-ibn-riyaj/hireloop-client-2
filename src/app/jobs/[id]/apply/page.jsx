import { getJobsById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session'
import { redirect } from 'next/navigation';
import React from 'react'
import JobApply from './JobApply';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import Link from 'next/link';
import { getPlanByPlanId } from '@/lib/api/plan';

const ApplyPage = async ({ params }) => {

  const { id } = await params;

  const user = await getUserSession();
  console.log('user', user)
  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`)
  }

  if (user.role !== 'seeker') {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center backdrop-blur-xl shadow-xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-red-500">Access Restricted</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Not Authorized. Only job seekers can access this application page.
          </p>
        </div>
      </div>
    )
  }

  const applications = await getApplicationsByApplicant(user?.id);
  console.log('applications', applications)

  const job = await getJobsById(id);
  console.log('job', job)

  

  const plan = await getPlanByPlanId(user?.plan || "seeker_free")
  console.log("plan ashce", plan)

  const isLimitReached = applications.length >= plan.maxApplicationsPerMonth;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 px-4 py-8 sm:py-12 lg:py-16 transition-colors duration-300">
      <div className="mx-auto max-w-3xl space-y-8">
        
        {/* Banner Section */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Status Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              {plan.name} Status
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug max-w-xl">
              You have applied <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">{applications.length}</span> out of {plan.maxApplications} jobs.
            </h2>

            {/* Application Progress Dots */}
            <div className="mt-4 flex gap-2">
              {Array.from({ length: plan.maxApplicationsPerMonth }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2.5 w-8 rounded-full transition-all duration-300 ${
                    index < applications.length
                      ? 'bg-indigo-600 dark:bg-indigo-500'
                      : 'bg-slate-200 dark:bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-zinc-400 font-medium">
              For more applications purchase our plans{' '}
              <Link
                href="/plans"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold underline underline-offset-4 transition-all duration-200 ml-1 group"
              >
                Buy Plans
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </p>
          </div>
        </div>

        {/* Limit Reached Banner */}
        {isLimitReached && (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 text-center text-amber-700 dark:text-amber-400 backdrop-blur-md">
            <p className="text-sm sm:text-base font-semibold">
              You’ve reached your maximum application limit for this plan. Please upgrade to apply for this job.
            </p>
          </div>
        )}

        {/* Application Form */}
        {!isLimitReached && (
          <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <JobApply applicant={user} job={job} />
          </div>
        )}

      </div>
    </div>
  )
}

export default ApplyPage