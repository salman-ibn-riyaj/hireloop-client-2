"use client";

import React, { useMemo, useState } from "react";
import { Table, Avatar, Chip, Button } from "@heroui/react";

export default function CompanyTable({ companies = [] }) {
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  const sortedCompanies = useMemo(() => {
    return [...companies].sort((a, b) => {
      const col = sortDescriptor.column;
      const first = String(a[col] || "");
      const second = String(b[col] || "");
      let cmp = first.localeCompare(second);

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [companies, sortDescriptor]);

  const getId = (id) => (typeof id === "object" && id?.$oid ? id.$oid : id);

  const formatDate = (dateObj) => {
    const rawDate = typeof dateObj === "object" && dateObj?.$date ? dateObj.$date : dateObj;
    if (!rawDate) return "N/A";
    return new Date(rawDate).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="w-full">
      {/* Desktop / Tablet Table View */}
      <div className="hidden sm:block w-full overflow-x-auto">
        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Companies approval table"
              className="min-w-full"
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
            >
              <Table.Header>
                <Table.Column allowsSorting isRowHeader id="name">
                  Company Name
                </Table.Column>
                <Table.Column id="recruiterEmail">
                  Recruiter Email
                </Table.Column>
                <Table.Column allowsSorting id="industry">
                  Industry
                </Table.Column>
                <Table.Column allowsSorting id="status">
                  Status
                </Table.Column>
                <Table.Column allowsSorting id="createdAt">
                  Date Submitted
                </Table.Column>
                <Table.Column id="actions">
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body emptyContent="No companies found.">
                {sortedCompanies.map((company) => {
                  const companyId = getId(company._id) || company.name;
                  const initials = company.name
                    ? company.name.substring(0, 2).toUpperCase()
                    : "CO";

                  const statusLower = company.status?.toLowerCase();

                  return (
                    <Table.Row key={companyId} id={companyId}>
                      {/* Company Name & Logo */}
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <Avatar
                            name={initials}
                            fallback={initials}
                            src={company.logo}
                            size="sm"
                            className="bg-default-200 text-default-700 font-bold"
                          />
                          <span className="font-medium text-sm text-default-900">
                            {company.name || "N/A"}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Recruiter Email */}
                      <Table.Cell>
                        <span className="text-default-600 text-sm">
                          {company.recruiterEmail || company.email || company.recruiterId || "N/A"}
                        </span>
                      </Table.Cell>

                      {/* Industry */}
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="flat"
                          color="default"
                          className="capitalize"
                        >
                          {company.industry?.trim() ? company.industry : "General"}
                        </Chip>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="dot"
                          color={
                            statusLower === "approved"
                              ? "success"
                              : statusLower === "rejected"
                              ? "danger"
                              : "warning"
                          }
                          className="capitalize"
                        >
                          {company.status || "Pending"}
                        </Chip>
                      </Table.Cell>

                      {/* Date Submitted */}
                      <Table.Cell>
                        <span className="text-default-500 text-sm whitespace-nowrap">
                          {formatDate(company.createdAt)}
                        </span>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell>
                        <div className="flex items-center gap-2 justify-end">
                          {statusLower === "pending" && (
                            <>
                              <Button size="sm" variant="flat" color="success">
                                Approve
                              </Button>
                              <Button size="sm" variant="flat" color="danger">
                                Reject
                              </Button>
                            </>
                          )}
                          {statusLower === "approved" && (
                            <Button size="sm" variant="flat" color="danger">
                              Reject
                            </Button>
                          )}
                          {statusLower === "rejected" && (
                            <Button size="sm" variant="flat" color="success">
                              Approve
                            </Button>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Mobile Responsive Cards */}
      <div className="block sm:hidden space-y-4">
        {sortedCompanies.length === 0 ? (
          <div className="text-center p-6 text-default-400 bg-content1 rounded-lg">
            No companies found.
          </div>
        ) : (
          sortedCompanies.map((company) => {
            const companyId = getId(company._id) || company.name;
            const initials = company.name
              ? company.name.substring(0, 2).toUpperCase()
              : "CO";
            const statusLower = company.status?.toLowerCase();

            return (
              <div
                key={companyId}
                className="p-4 rounded-xl bg-content1 border border-default-100 dark:border-default-50/10 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={initials}
                      fallback={initials}
                      src={company.logo}
                      size="sm"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-default-900">
                        {company.name || "N/A"}
                      </span>
                      <span className="text-xs text-default-400">
                        {company.recruiterEmail || company.email || "N/A"}
                      </span>
                    </div>
                  </div>
                  <Chip
                    size="sm"
                    variant="dot"
                    color={
                      statusLower === "approved"
                        ? "success"
                        : statusLower === "rejected"
                        ? "danger"
                        : "warning"
                    }
                    className="capitalize"
                  >
                    {company.status || "Pending"}
                  </Chip>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-default-100 dark:border-default-50/10">
                  <Chip size="sm" variant="flat" className="capitalize">
                    {company.industry?.trim() ? company.industry : "General"}
                  </Chip>
                  <span className="text-default-400">
                    {formatDate(company.createdAt)}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-default-100 dark:border-default-50/10 justify-end">
                  {statusLower === "pending" && (
                    <>
                      <Button size="sm" variant="flat" color="success" className="flex-1">
                        Approve
                      </Button>
                      <Button size="sm" variant="flat" color="danger" className="flex-1">
                        Reject
                      </Button>
                    </>
                  )}
                  {statusLower === "approved" && (
                    <Button size="sm" variant="flat" color="danger" className="flex-1">
                      Reject
                    </Button>
                  )}
                  {statusLower === "rejected" && (
                    <Button size="sm" variant="flat" color="success" className="flex-1">
                      Approve
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}