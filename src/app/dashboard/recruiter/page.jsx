'use client'
import { authClient } from "@/lib/auth-client"
import StatCard from '@/components/StatCard';
import {
  FileText,
  Persons,
  Thunderbolt,
  Check,
  Briefcase,
  Clock,
  Eye
} from '@gravity-ui/icons';
import { Spinner } from "@heroui/react";

const RecruiterDashboardHomePage = () => {

  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="flex items-center justify-center h-screen">
      <Spinner className="text-success" size="lg" />
    </div>;
  }

  const user = session?.user;

  const statsData = [
    { title: 'Total Job Posts', value: '48', icon: FileText },
    { title: 'Total Applicants', value: '1,284', icon: Persons },
    { title: 'Active Jobs', value: '18', icon: Thunderbolt },
    { title: 'Jobs Closed', value: '32', icon: Check },
  ];

  return (
    <div>

      <p className="text-2xl px-4 py-2">Welcome, {user?.name}</p>

      <div className="p-4 sm:p-6 lg:p-8 bg-[#09090b] min-h-screen text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">

          </h2>

          {/* 
          Breakpoint Grid System:
          - Mobile: 1 column
          - Tablet (sm/md): 2 columns
          - Laptop (lg): 3 columns
          - Desktop (xl): 4 columns
        */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {statsData.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default RecruiterDashboardHomePage
