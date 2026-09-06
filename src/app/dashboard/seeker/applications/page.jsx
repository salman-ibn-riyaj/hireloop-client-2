// import { getApplicationsByApplicant } from '@/lib/api/applications'
// import { getUserSession } from '@/lib/core/session'
// import React from 'react'

// const ApplicationsPage = async() => {
//     const user = await getUserSession()
//     const jobs = await getApplicationsByApplicant(user?.id)
//   return (
//     <div>ApplicationsPage {jobs.length}</div>
//   )
// }

// export default ApplicationsPage

import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import ApplicationsTable from './ApplicationsTable';

const ApplicationsPage = async () => {
  const user = await getUserSession();
  const jobs = (await getApplicationsByApplicant(user?.id)) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">
            My Applications
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage and track all the positions you have applied for.
          </p>
        </div>
      </div>

      {/* Client Component displaying the table */}
      <ApplicationsTable jobs={jobs} />
    </div>
  );
};

export default ApplicationsPage;