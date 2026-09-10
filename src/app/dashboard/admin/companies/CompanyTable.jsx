"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { Table, Avatar, Chip, Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import { updateCompany } from "@/lib/actions/comapanies";

export default function CompanyTable({ companies = [] }) {
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  const [actionLoading, setActionLoading] = useState({});
  const tableContainerRef = useRef(null);

  // Initialize Lenis smooth scrolling for scrollable containers
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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

  // GSAP micro-animation on action button click
  // const handleAction = async (e, companyId, actionType) => {
  //   // GSAP Button Ripple / Pulse Animation
  //   if (e?.currentTarget) {
  //     gsap.to(e.currentTarget, {
  //       scale: 0.92,
  //       duration: 0.1,
  //       yoyo: true,
  //       repeat: 1,
  //       ease: "power2.inOut",
  //     });
  //   }

  //   setActionLoading((prev) => ({ ...prev, [companyId]: actionType }));
  //   try {
  //     // Backend API call placeholder
  //     console.log(`Executing ${actionType} on company: ${companyId}`);
  //     await new Promise((resolve) => setTimeout(resolve, 800));
  //   } catch (err) {
  //     console.error(`Failed to execute ${actionType}:`, err);
  //   } finally {
  //     setActionLoading((prev) => ({ ...prev, [companyId]: null }));
  //   }
  // };
  // GSAP micro-animation on action button click
  // const handleAction = async (e, companyId, actionType) => {
  //   // GSAP Button Ripple / Pulse Animation
  //   if (e?.currentTarget) {
  //     gsap.to(e.currentTarget, {
  //       scale: 0.92,
  //       duration: 0.1,
  //       yoyo: true,
  //       repeat: 1,
  //       ease: "power2.inOut",
  //     });
  //   }

  //   setActionLoading((prev) => ({ ...prev, [companyId]: actionType }));
  //   try {
  //     const status = actionType === "approve" ? "approved" : "rejected";
  //     await updateCompany(companyId, { status });
  //   } catch (err) {
  //     console.error(`Failed to execute ${actionType}:`, err);
  //   } finally {
  //     setActionLoading((prev) => ({ ...prev, [companyId]: null }));
  //   }
  // };

  // GSAP micro-animation on action button click
  const handleAction = async (e, companyId, actionType) => {
    // GSAP Button Ripple / Pulse Animation
    if (e?.currentTarget) {
      gsap.to(e.currentTarget, {
        scale: 0.92,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }

    // Extract raw string ID if an object with $oid is passed
    const rawId = typeof companyId === "object" && companyId?.$oid ? companyId.$oid : companyId;

    setActionLoading((prev) => ({ ...prev, [companyId]: actionType }));
    try {
      const status = actionType === "approve" ? "Approved" : "Rejected";
      await updateCompany(rawId, { status });
    } catch (err) {
      console.error(`Failed to execute ${actionType}:`, err);
    } finally {
      setActionLoading((prev) => ({ ...prev, [companyId]: null }));
    }
  };

  const renderActionButtons = (companyId, status, isMobile = false) => {
    const statusLower = status?.toLowerCase();
    const currentLoading = actionLoading[companyId];

    const showApprove = statusLower === "pending" || statusLower === "rejected";
    const showReject = statusLower === "pending" || statusLower === "approved";

    return (
      <div className={`flex items-center gap-2 ${isMobile ? "w-full pt-1" : "justify-end"}`}>
        <AnimatePresence mode="wait">
          {showApprove && (
            <motion.div
              key="approve-btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={isMobile ? "flex-1" : ""}
            >
              <Button
                size="sm"
                color="success"
                variant="solid"
                isLoading={currentLoading === "approve"}
                isDisabled={!!currentLoading}
                onClick={(e) => handleAction(e, companyId, "approve")}
                className={`font-semibold text-white shadow-md shadow-success/20 hover:shadow-lg hover:shadow-success/30 transition-all ${isMobile ? "w-full" : "px-4"
                  }`}
              >
                Approve
              </Button>
            </motion.div>
          )}

          {showReject && (
            <motion.div
              key="reject-btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={isMobile ? "flex-1" : ""}
            >
              <Button
                size="sm"
                color="danger"
                variant="solid"
                isLoading={currentLoading === "reject"}
                isDisabled={!!currentLoading}
                onClick={(e) => handleAction(e, companyId, "reject")}
                className={`font-semibold text-white shadow-md shadow-danger/20 hover:shadow-lg hover:shadow-danger/30 transition-all ${isMobile ? "w-full" : "px-4"
                  }`}
              >
                Reject
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Desktop & Tablet Table Container */}
      <div
        ref={tableContainerRef}
        className="hidden sm:block w-full overflow-hidden rounded-2xl border border-default-200/70 dark:border-default-100/15 bg-content1 shadow-sm"
      >
        <Table>
          <Table.ScrollContainer className="max-h-[600px] overflow-y-auto">
            <Table.Content
              aria-label="Companies approval table"
              className="min-w-full"
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
            >
              <Table.Header>
                <Table.Column
                  allowsSorting
                  isRowHeader
                  id="name"
                  className="bg-default-100/80 dark:bg-default-50/10 text-default-600 font-bold text-[11px] uppercase tracking-wider py-4 px-5"
                >
                  Company
                </Table.Column>
                <Table.Column
                  id="recruiterEmail"
                  className="bg-default-100/80 dark:bg-default-50/10 text-default-600 font-bold text-[11px] uppercase tracking-wider py-4 px-5"
                >
                  Recruiter Contact
                </Table.Column>
                <Table.Column
                  allowsSorting
                  id="industry"
                  className="bg-default-100/80 dark:bg-default-50/10 text-default-600 font-bold text-[11px] uppercase tracking-wider py-4 px-5"
                >
                  Industry
                </Table.Column>
                <Table.Column
                  allowsSorting
                  id="status"
                  className="bg-default-100/80 dark:bg-default-50/10 text-default-600 font-bold text-[11px] uppercase tracking-wider py-4 px-5"
                >
                  Status
                </Table.Column>
                <Table.Column
                  allowsSorting
                  id="createdAt"
                  className="bg-default-100/80 dark:bg-default-50/10 text-default-600 font-bold text-[11px] uppercase tracking-wider py-4 px-5"
                >
                  Submitted Date
                </Table.Column>
                <Table.Column
                  id="actions"
                  className="bg-default-100/80 dark:bg-default-50/10 text-default-600 font-bold text-[11px] uppercase tracking-wider py-4 px-5 text-right"
                >
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body
                emptyContent={
                  <div className="py-12 text-center text-default-400 font-medium">
                    No companies available for review.
                  </div>
                }
              >
                {sortedCompanies.map((company, index) => {
                  const companyId = getId(company._id) || company.name;
                  const initials = company.name
                    ? company.name.substring(0, 2).toUpperCase()
                    : "CO";
                  const statusLower = company.status?.toLowerCase();

                  return (
                    <Table.Row
                      key={companyId}
                      id={companyId}
                      className="border-b border-default-100/70 dark:border-default-50/10 hover:bg-default-100/40 dark:hover:bg-default-50/5 transition-colors"
                    >
                      {/* Name & Avatar */}
                      <Table.Cell className="py-3.5 px-5">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.04 }}
                          className="flex items-center gap-3"
                        >
                          <Avatar
                            name={initials}
                            fallback={initials}
                            src={company.logo}
                            size="sm"
                            className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 font-bold shrink-0 ring-1 ring-primary-500/20"
                          />
                          <span className="font-semibold text-sm text-default-900 dark:text-default-100 truncate max-w-[200px]">
                            {company.name || "N/A"}
                          </span>
                        </motion.div>
                      </Table.Cell>

                      {/* Recruiter Email */}
                      <Table.Cell className="py-3.5 px-5">
                        <span className="text-default-600 dark:text-default-400 text-sm font-medium truncate block max-w-[220px]">
                          {company.recruiterEmail || company.email || company.recruiterId || "N/A"}
                        </span>
                      </Table.Cell>

                      {/* Industry */}
                      <Table.Cell className="py-3.5 px-5">
                        <Chip
                          size="sm"
                          variant="flat"
                          color="default"
                          className="capitalize font-semibold text-xs border border-default-200/50 dark:border-default-100/10"
                        >
                          {company.industry?.trim() ? company.industry : "General"}
                        </Chip>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell className="py-3.5 px-5">
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
                          className="capitalize font-semibold text-xs border-none"
                        >
                          {company.status || "Pending"}
                        </Chip>
                      </Table.Cell>

                      {/* Date */}
                      <Table.Cell className="py-3.5 px-5">
                        <span className="text-default-500 dark:text-default-400 text-sm whitespace-nowrap font-medium">
                          {formatDate(company.createdAt)}
                        </span>
                      </Table.Cell>

                      {/* Action Buttons */}
                      <Table.Cell className="py-3.5 px-5">
                        {renderActionButtons(companyId, company.status, false)}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Mobile Card Layout */}
      <div className="block sm:hidden space-y-3">
        {sortedCompanies.length === 0 ? (
          <div className="text-center p-8 text-default-400 bg-content1 rounded-2xl border border-default-200/60 font-medium">
            No companies available for review.
          </div>
        ) : (
          sortedCompanies.map((company, index) => {
            const companyId = getId(company._id) || company.name;
            const initials = company.name
              ? company.name.substring(0, 2).toUpperCase()
              : "CO";
            const statusLower = company.status?.toLowerCase();

            return (
              <motion.div
                key={companyId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="p-4 rounded-2xl bg-content1 border border-default-200/80 dark:border-default-100/20 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar
                      name={initials}
                      fallback={initials}
                      src={company.logo}
                      size="sm"
                      className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 font-bold shrink-0 ring-1 ring-primary-500/20"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-sm text-default-900 dark:text-default-100 truncate">
                        {company.name || "N/A"}
                      </span>
                      <span className="text-xs text-default-400 truncate">
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
                    className="capitalize font-semibold text-xs shrink-0"
                  >
                    {company.status || "Pending"}
                  </Chip>
                </div>

                <div className="flex items-center justify-between text-xs pt-2.5 border-t border-default-100 dark:border-default-50/10">
                  <Chip size="sm" variant="flat" className="capitalize text-[11px] font-medium h-6">
                    {company.industry?.trim() ? company.industry : "General"}
                  </Chip>
                  <span className="text-default-400 font-medium">
                    {formatDate(company.createdAt)}
                  </span>
                </div>

                {renderActionButtons(companyId, company.status, true)}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}