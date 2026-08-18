import React from 'react'
import RecruiterCompanyPage from './RecruiterCompanyPage'
import { getUserSession } from '@/lib/core/session'

const CompanyPage = async() => {

    const user = await getUserSession();
    console.log('USer found', user);

  return (
    <RecruiterCompanyPage recruiter={user}/>
  )
}

export default CompanyPage