import { Suspense } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import { getJobs } from "@/lib/api/jobs";

// 1. Accept searchParams as a prop from Next.js
export default async function JobsPage({ searchParams }) {
  // 2. Read the query parameters from URL
  const filters = await searchParams;
  
  // 3. Pass filters to getJobs (triggers serverFetch('/api/jobs?search=...'))
  const jobs = await getJobs(filters);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Latest Jobs</h1>

        <p className="mt-2 text-muted">
          Explore the latest career opportunities.
        </p>
      </div>

      {/* 4. Filter bar component */}
      <Suspense fallback={<div className="h-16 bg-content1 rounded-2xl animate-pulse mb-8" />}>
        <JobFilters />
      </Suspense>

      {/* 5. Render job cards or empty state */}
      {jobs.length === 0 ? (
        <div className="text-center py-16 bg-content1 rounded-2xl border border-default-100">
          <h3 className="text-lg font-semibold">No jobs found</h3>
          <p className="text-default-500 text-sm mt-1">
            Try adjusting or clearing your filters to find open roles.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}