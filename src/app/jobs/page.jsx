import { Suspense } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import { getJobs } from "@/lib/api/jobs";
import JobsPagination from "./JobsPagination";

const PAGE_SIZE = 9; // 3 column grid এ 3 row

export default async function JobsPage({ searchParams }) {
  // page আলাদা করে নিচ্ছি, বাকিগুলো filter (search, category, type ...)
  const { page: pageParam, ...filters } = await searchParams;
  const page = Math.max(parseInt(pageParam, 10) || 1, 1);

  // Backend-এ pagination: শুধু এই page এর ৯টা job আসবে
  const data = await getJobs({
    ...filters,
    page,
    limit: PAGE_SIZE,
  });

  // data null হলে (API error) default value ব্যবহার হবে
  const {
    jobs = [],
    totalItems = 0,
    totalPages = 1,
    currentPage = 1,
  } = data ?? {};

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Latest Jobs</h1>

        <p className="mt-2 text-muted">
          Explore the latest career opportunities.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="mb-8 h-16 animate-pulse rounded-2xl bg-content1" />
        }
      >
        <JobFilters />
      </Suspense>

      {totalItems === 0 ? (
        <div className="rounded-2xl border border-default-100 bg-content1 py-16 text-center">
          <h3 className="text-lg font-semibold">No jobs found</h3>
          <p className="mt-1 text-sm text-default-500">
            Try adjusting or clearing your filters to find open roles.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          {totalPages > 1 && (
            <Suspense fallback={null}>
              <JobsPagination
                page={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={PAGE_SIZE}
              />
            </Suspense>
          )}
        </>
      )}
    </section>
  );
}