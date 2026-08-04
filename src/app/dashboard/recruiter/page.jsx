'use client'
import { authClient } from "@/lib/auth-client"

const RecruiterDashboardHomePage = () => {

  const { data: session } = authClient.useSession();
  const user = session?.user;
  return (
    <div>
     
      <p className="text-2xl px-4 py-2">Welcome, {user?.name}</p>
       
    </div>
  )
}

export default RecruiterDashboardHomePage
