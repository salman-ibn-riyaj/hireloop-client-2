
import JobCard from "@/components/jobs/JobCard";
import { getJobs } from "@/lib/api/jobs";


export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Latest Jobs</h1>

        <p className="mt-2 text-muted">
          Explore the latest career opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
}