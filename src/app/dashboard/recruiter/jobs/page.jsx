import JobsTable from "@/components/JobsTable";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
import { getCompanyJobs } from "@/lib/api/jobs";




const RecruiterJobs = async () => {
  const company = await getLoggedInRecruiterCompany()
  const jobs = await getCompanyJobs(company._id) || [];

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            Recruiter Jobs
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your active MongoDB postings and applicant visibility.
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#141416] border border-zinc-800/80 rounded-2xl p-2 md:p-4 shadow-xl overflow-hidden">
        <JobsTable jobs={jobs} />
      </div>
    </div>
  );
};

export default RecruiterJobs;