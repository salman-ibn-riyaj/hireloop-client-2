import { getJobsById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session'
import { redirect } from 'next/navigation';
import React from 'react'
import JobApply from './JobApply';

const ApplyPage = async ({ params }) => {

  const { id } = await params;

  const user = await getUserSession();
  console.log('user', user)
  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`)
  }



  if (user.role !== 'seeker') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 to-black px-4 py-12">
        <div className="text-center">
          <p className="text-sm text-red-500 font-medium sm:text-base lg:text-lg">
            Not Authorize, only seeker can access the page.
          </p>
        </div>
      </div>
    )
  }

  const job = await getJobsById(id);
  console.log('job', job)


  return (
    <div><JobApply job={job} /></div>
  )
}

export default ApplyPage