'use client';

import React from 'react';
import { Table, Button, Tooltip, Link } from '@heroui/react';
import { 
  FileText, 
  Globe, 
  Building2, 
  Calendar, 
  Briefcase, 
  MessageSquareText, 
  ExternalLink 
} from 'lucide-react';

export default function ApplicationsTable({ jobs = [] }) {
  // Helper to safely format dates ($date object or string/timestamp)
  const formatDate = (dateField) => {
    if (!dateField) return 'N/A';
    const rawDate = typeof dateField === 'object' && dateField?.$date ? dateField.$date : dateField;
    return new Date(rawDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Helper to safely extract MongoDB IDs ($oid object or string)
  const getObjectId = (idField) => {
    if (!idField) return Math.random().toString();
    return typeof idField === 'object' && idField?.$oid ? idField.$oid : idField;
  };

  return (
    <Table className="w-full">
      <Table.ScrollContainer>
        <Table.Content aria-label="Applied Jobs Table">
          <Table.Header>
            <Table.Column isRowHeader>JOB ROLE & COMPANY</Table.Column>
            <Table.Column>APPLIED DATE</Table.Column>
            <Table.Column>LIVE LINKS</Table.Column>
            <Table.Column>NOTES</Table.Column>
            <Table.Column align="end">ACTIONS</Table.Column>
          </Table.Header>

          <Table.Body emptyContent="You haven't applied to any jobs yet.">
            {jobs.map((job) => {
              const rowId = getObjectId(job._id);
              const resume = job.resumeUrl;
              const portfolio = job.portfolioUrl;

              return (
                <Table.Row key={rowId}>
                  {/* Primary Row Header Cell */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300">
                        <Briefcase className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-100 text-sm">
                          {job.jobTitle || 'Untitled Role'}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-500" />
                          {job.companyName || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Applied Date */}
                  <Table.Cell>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{formatDate(job.createdAt)}</span>
                    </div>
                  </Table.Cell>

                  {/* Live Resume & Portfolio Links */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      {resume ? (
                        <Tooltip content="Open Google Drive Resume">
                          <Link
                            href={resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="sm"
                            variant="flat"
                            color="primary"
                            startContent={<FileText className="w-3.5 h-3.5" />}
                            endContent={<ExternalLink className="w-3 h-3 opacity-70" />}
                            className="text-xs font-medium cursor-pointer"
                          >
                            Resume
                          </Link>
                        </Tooltip>
                      ) : (
                        <span className="text-xs text-slate-600">No Resume</span>
                      )}

                      {portfolio ? (
                        <Tooltip content="Open Live Portfolio">
                          <Link
                            href={portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="sm"
                            variant="flat"
                            color="secondary"
                            startContent={<Globe className="w-3.5 h-3.5" />}
                            endContent={<ExternalLink className="w-3 h-3 opacity-70" />}
                            className="text-xs font-medium cursor-pointer"
                          >
                            Portfolio
                          </Link>
                        </Tooltip>
                      ) : (
                        <span className="text-xs text-slate-600">No Portfolio</span>
                      )}
                    </div>
                  </Table.Cell>

                  {/* Applicant Notes */}
                  <Table.Cell>
                    {job.notes ? (
                      <Tooltip
                        content={
                          <div className="px-2 py-1 max-w-xs">
                            <p className="text-xs font-semibold text-slate-200 mb-1">Application Notes:</p>
                            <p className="text-xs text-slate-300 leading-relaxed break-words">{job.notes}</p>
                          </div>
                        }
                        placement="top"
                      >
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-slate-400 hover:text-amber-400"
                        >
                          <MessageSquareText className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                    ) : (
                      <span className="text-xs text-slate-600 font-mono">No notes</span>
                    )}
                  </Table.Cell>

                  {/* Actions */}
                  <Table.Cell>
                    <div className="flex items-center justify-end">
                      {job.jobId && (
                        <Tooltip content="View Job Posting">
                          <Button
                            as={Link}
                            href={`/jobs/${job.jobId}`}
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-slate-400 hover:text-white"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Tooltip>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      <Table.Footer>
        <div className="flex items-center justify-between px-4 py-3 text-xs text-slate-400 border-t border-slate-800">
          <span>Total Applications: <strong className="text-slate-200">{jobs.length}</strong></span>
        </div>
      </Table.Footer>
    </Table>
  );
}