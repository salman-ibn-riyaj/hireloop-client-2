import { DashboardSidebar } from "@/components/DashboardSidebar"


const DashboardLayout = ({children}) => {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar/>
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default DashboardLayout