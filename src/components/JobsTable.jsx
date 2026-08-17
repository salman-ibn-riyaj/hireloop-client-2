"use client";

import React from "react";
import Link from "next/link";
import { Table, Chip, Button } from "@heroui/react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function JobsTable({ jobs = [] }) {
  const handleDelete = async (jobId) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      console.log("Deleting job ID:", jobId);
      // Call your backend delete API endpoint here
    }
  };

  return (
    <Table className="w-full">
      <Table.ScrollContainer>
        <Table.Content aria-label="Recruiter Posted Jobs" className="min-w-[700px]">
          <Table.Header>
            <Table.Column isRowHeader>Job Title</Table.Column>
            <Table.Column>Type / Category</Table.Column>
            <Table.Column>Location</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column className="text-right">Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {jobs.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={5} className="text-center py-8 text-zinc-400">
                  No jobs found.
                </Table.Cell>
              </Table.Row>
            ) : (
              jobs.map((job) => (
                <Table.Row
                  key={job._id || job.id}
                  className="hover:bg-zinc-900/50 transition-colors border-b border-zinc-800/50"
                >
                  {/* Job Title */}
                  <Table.Cell>
                    <div className="font-medium text-zinc-100">{job.title || "Untitled Position"}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      ID: {job._id ? String(job._id).slice(-6) : "N/A"}
                    </div>
                  </Table.Cell>

                  {/* Type / Category */}
                  <Table.Cell>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="capitalize text-xs font-medium px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700/80 text-zinc-200">
                        {job.type || "Full-time"}
                      </span>
                      <span className="capitalize text-xs px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {job.category || "General"}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Location */}
                  <Table.Cell>
                    <span className="text-sm text-zinc-300">
                      {job.isRemote ? "Remote" : job.location || "On-site"}
                    </span>
                  </Table.Cell>

                  {/* Status */}
                  <Table.Cell>
                    <Chip
                      className={`h-6 text-[11px] capitalize px-2 border ${
                        job.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-zinc-800 text-zinc-400 border-zinc-700"
                      }`}
                    >
                      {job.status || "active"}
                    </Chip>
                  </Table.Cell>

                  {/* Actions */}
                  <Table.Cell>
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View Button */}
                      <Link href={`/dashboard/recruiter/jobs/${job._id || job.id}`}>
                        <Button
                          aria-label="View Job Details"
                          className="p-2 min-w-0 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs transition-colors"
                        >
                          <FiEye className="w-4 h-4" />
                        </Button>
                      </Link>

                      {/* Edit Button */}
                      <Link href={`/dashboard/recruiter/jobs/edit/${job._id || job.id}`}>
                        <Button
                          aria-label="Edit Job"
                          className="p-2 min-w-0 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs transition-colors"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Button>
                      </Link>

                      {/* Delete Button */}
                      <Button
                        aria-label="Delete Job"
                        onClick={() => handleDelete(job._id || job.id)}
                        className="p-2 min-w-0 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs border border-rose-500/20 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}