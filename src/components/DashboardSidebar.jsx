
import { getUserSession } from "@/lib/core/session";
import { LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person, GearDot, MagnifierPlus } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Banknote, Bookmark, Building2, FileText, LayoutGrid, Settings, Users } from "lucide-react";
import Link from "next/link";
import { HiBriefcase, HiBuildingOffice, HiCreditCard } from "react-icons/hi2";


export async function DashboardSidebar() {

  const user = await getUserSession();
  console.log("user ki ashe nai", user);

  const recruiterNavItems = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
    { icon: Envelope, href: "/dashboard/recruiter/company", label: "Company Profile" },
    { icon: Person, href: "/profile", label: "Profile" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const seekerNavItems = [
    { icon: LayoutGrid, href: "/dashboard/seeker", label: "Dashboard" },
    { icon: MagnifierPlus, href: "/jobs", label: "Jobs" },
    { icon: Bookmark, href: "/dashboard/seeker/saved", label: "Saved Jobs" },
    { icon: FileText, href: "/dashboard/seeker/applications", label: "Applications" },
    { icon: Banknote, href: "/dashboard/seeker/billing", label: "Billing" },
    { icon: GearDot, href: "/settings", label: "Settings" },
  ];

  const adminNavItems = [
    { icon: LayoutGrid, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Users, href: "/dashboard/admin/users", label: "Users" },
    { icon: HiBuildingOffice, href: "/dashboard/admin/companies", label: "Companies" },
    { icon: HiBriefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
    { icon: HiCreditCard, href: "/dashboard/admin/payments", label: "Payments" },
    { icon: Settings, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  const navLinksMap = {
    seeker: seekerNavItems,
    recruiter: recruiterNavItems,
    admin: adminNavItems
  }

  const navItems = navLinksMap[user?.role || 'seeker']

  const navContent = <nav className="flex flex-col gap-1">
    {navItems.map((item) => (
      <Link
        key={item.label}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        href={item.href}
      >
        <item.icon className="size-5 text-muted" />
        {item.label}
      </Link>
    ))}
  </nav>

  return (
    <>
      <aside className="hidden lg:block shrink-0 w-64 border-r border-default p-4">{navContent}</aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer></>
  );
}