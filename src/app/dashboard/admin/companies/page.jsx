import React from "react";
import { getCompanies } from "@/lib/api/companies";
import CompanyTable from "./CompanyTable";

export const revalidate = 0; // Ensure fresh server-side data fetching

export default async function AdminCompaniesPage() {
  let companies = [];
  let errorOccurred = false;

  try {
    companies = (await getCompanies()) || [];
  } catch (err) {
    console.error("Failed to fetch companies:", err);
    errorOccurred = true;
  }

  // Calculate high-level metrics
  const totalCompanies = companies.length;
  const pendingCount = companies.filter(
    (c) => c.status?.toLowerCase() === "pending"
  ).length;
  const approvedCount = companies.filter(
    (c) => c.status?.toLowerCase() === "approved"
  ).length;
  const rejectedCount = companies.filter(
    (c) => c.status?.toLowerCase() === "rejected"
  ).length;

  return (
    <div className="w-full min-h-screen bg-background p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Company Management
          </h1>
          <p className="text-sm text-default-500">
            Review, approve, and monitor company registrations and recruiters.
          </p>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-content1 border border-default-200/60 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-medium text-default-500 uppercase tracking-wider">
            Total Submissions
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-foreground mt-2">
            {totalCompanies}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-content1 border border-default-200/60 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-medium text-warning-600 uppercase tracking-wider">
            Pending Review
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-warning-600 mt-2">
            {pendingCount}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-content1 border border-default-200/60 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-medium text-success-600 uppercase tracking-wider">
            Approved
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-success-600 mt-2">
            {approvedCount}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-content1 border border-default-200/60 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-medium text-danger-600 uppercase tracking-wider">
            Rejected
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-danger-600 mt-2">
            {rejectedCount}
          </p>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="w-full">
        {errorOccurred ? (
          <div className="p-8 text-center bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-xl">
            <p className="text-danger font-semibold text-base">
              Failed to load company data.
            </p>
            <p className="text-danger-400 text-sm mt-1">
              Please refresh the page or check your database connection.
            </p>
          </div>
        ) : (
          <CompanyTable companies={companies} />
        )}
      </div>
    </div>
  );
}