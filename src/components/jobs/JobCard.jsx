"use client";

import { Button, Card } from "@heroui/react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  MapPin,
  Wifi,
} from "lucide-react";

export default function JobCard({ job }) {
  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: job.currency || "USD",
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const workMode = job.isRemote ? "Remote" : "On-site";

  return (
    <Card className="group w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/90 p-0 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
      {/* Top Section */}
      <Card.Header className="flex flex-col items-start gap-5 p-6">
        {/* Company Info */}
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Company Logo */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2">
              <img
                src={job.companyLogo}
                alt={`${job.companyName} logo`}
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p className="text-sm text-zinc-400">Company</p>
              <h3 className="font-semibold text-white">
                {job.companyName}
              </h3>
            </div>
          </div>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
            {job.type.replace("-", " ")}
          </span>
        </div>

        {/* Job Title */}
        <div>
          <Card.Title className="text-2xl font-bold text-white transition-colors group-hover:text-primary">
            {job.title}
          </Card.Title>

          <Card.Description className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
            {job.responsibilities}
          </Card.Description>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {/* Location */}
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-sm text-zinc-300">
            <MapPin size={15} className="text-primary" />
            <span>{job.location}</span>
          </div>

          {/* Work Mode */}
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-sm text-zinc-300">
            <Wifi size={15} className="text-primary" />
            <span>{workMode}</span>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-sm capitalize text-zinc-300">
            <BriefcaseBusiness size={15} className="text-primary" />
            <span>{job.category}</span>
          </div>
        </div>
      </Card.Header>

      {/* Footer */}
      <Card.Footer className="flex flex-col gap-4 border-t border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          {/* Salary */}
          <span className="text-lg font-semibold text-white">
            {formatSalary(job.salaryMin)} – {formatSalary(job.salaryMax)}
          </span>

          {/* Deadline */}
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <CalendarDays size={14} />
            <span>
              Deadline:{" "}
              {new Date(job.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <Button
          color="primary"
          className="w-full font-semibold sm:w-auto"
          endContent={<ArrowRight size={17} />}
        >
          Apply Now
        </Button>
      </Card.Footer>
    </Card>
  );
}