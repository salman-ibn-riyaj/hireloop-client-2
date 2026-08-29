import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getJobsById } from '@/lib/api/jobs';

// HeroUI Components
import { Card, Button, Chip, Separator, Link as HeroLink } from '@heroui/react';

// Lucide Icons
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Globe, 
  ArrowLeft, 
  CheckCircle2, 
  Clock,
  Sparkles
} from 'lucide-react';

export default async function JobDetailsPage({ params }) {
  const { id } = await params;
  const job = await getJobsById(id);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
        <p className="text-default-500 mb-6">The job post you are looking for might have been removed or does not exist.</p>
        <Link href="/jobs">
          <Button color="primary" variant="flat" startcontent={<ArrowLeft size={18} />}>
            Back to Jobs
          </Button>
        </Link>
      </div>
    );
  }

  const formatSalary = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const parseList = (text) => {
    if (!text) return [];
    return text.split(/\. |\n/).filter((item) => item.trim().length > 0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link href="/jobs">
          <Button 
            variant="light" 
            startContent={<ArrowLeft size={18} />}
            className="font-medium"
          >
            Back to all jobs
          </Button>
        </Link>
      </div>

      {/* Hero Header Card */}
      <Card className="p-6 mb-8 border-none shadow-md bg-content1">
        <Card.Header className="p-0 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
            
            {/* Company Info & Title */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-default-100 flex-shrink-0 border border-default-200">
                {job.companyLogo ? (
                  <Image 
                    src={job.companyLogo} 
                    alt={job.companyName || 'Company Logo'} 
                    fill 
                    className="object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-default-400">
                    <Briefcase size={28} />
                  </div>
                )}
              </div>
              <div>
                <Card.Title className="text-2xl sm:text-3xl font-bold text-foreground">
                  {job.title}
                </Card.Title>
                <Card.Description className="text-medium text-default-500 font-medium">
                  {job.companyName}
                </Card.Description>
              </div>
            </div>

            {/* Application Action */}
            <div className="w-full sm:w-auto flex flex-col sm:items-end gap-2">
              <Button 
                color="primary" 
                size="lg" 
                className="w-full sm:w-auto font-semibold shadow-lg shadow-primary/30"
              >
                Apply Now
              </Button>
              <span className="text-xs text-default-400 flex items-center gap-1 self-center sm:self-end">
                <Clock size={12} /> Deadline: {new Date(job.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>

          <Separator className="my-2" />

          {/* Metadata Chips */}
          <div className="flex flex-wrap gap-3">
            <Chip 
              startcontent={<MapPin size={16} className="text-primary" />} 
              variant="flat" 
              color="default"
            >
              {job.location}
            </Chip>

            {job.isRemote && (
              <Chip 
                startcontent={<Globe size={16} className="text-success" />} 
                variant="flat" 
                color="success"
              >
                Remote
              </Chip>
            )}

            <Chip 
              startcontent={<Briefcase size={16} className="text-secondary" />} 
              variant="flat" 
              color="secondary"
              className="capitalize"
            >
              {job.type}
            </Chip>

            <Chip 
              startcontent={<DollarSign size={16} className="text-warning" />} 
              variant="flat" 
              color="warning"
            >
              {formatSalary(job.salaryMin, job.currency)} - {formatSalary(job.salaryMax, job.currency)}
            </Chip>
          </div>
        </Card.Header>
      </Card>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Section: Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Responsibilities */}
          {job.responsibilities && (
            <Card className="p-6 border-none shadow-sm bg-content1">
              <Card.Header className="p-0 mb-4">
                <Card.Title className="text-xl font-bold">Key Responsibilities</Card.Title>
              </Card.Header>
              <ul className="space-y-3">
                {parseList(job.responsibilities).map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-default-700">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Requirements */}
          {job.requirements && (
            <Card className="p-6 border-none shadow-sm bg-content1">
              <Card.Header className="p-0 mb-4">
                <Card.Title className="text-xl font-bold">Requirements & Qualifications</Card.Title>
              </Card.Header>
              <ul className="space-y-3">
                {parseList(job.requirements).map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-default-700">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Benefits */}
          {job.benefits && (
            <Card className="p-6 border-none shadow-sm bg-content1">
              <Card.Header className="p-0 mb-4">
                <Card.Title className="text-xl font-bold">Perks & Benefits</Card.Title>
              </Card.Header>
              <ul className="space-y-3">
                {parseList(job.benefits).map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-default-700">
                    <Sparkles size={18} className="text-warning flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

        </div>

        {/* Right Section: Sidebar Overview */}
        <div className="space-y-6">
          <Card className="p-6 border-none shadow-sm bg-content1">
            <Card.Header className="p-0 mb-4">
              <Card.Title className="text-lg font-bold">Job Overview</Card.Title>
            </Card.Header>

            <Separator className="mb-4" />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="text-default-400 mt-1" size={20} />
                <div>
                  <p className="text-xs text-default-400">Date Posted</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(job.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-default-400 mt-1" size={20} />
                <div>
                  <p className="text-xs text-default-400">Application Deadline</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(job.deadline).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="text-default-400 mt-1" size={20} />
                <div>
                  <p className="text-xs text-default-400">Category</p>
                  <p className="text-sm font-medium text-foreground capitalize">
                    {job.category?.replace('-', ' ')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-default-400 mt-1" size={20} />
                <div>
                  <p className="text-xs text-default-400">Workplace</p>
                  <p className="text-sm font-medium text-foreground">
                    {job.isRemote ? 'Remote / ' : ''}{job.location}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <Card.Footer className="p-0 flex-col items-stretch gap-3">
              <Button color="primary" className="w-full font-semibold">
                Apply for Position
              </Button>
              <HeroLink
                aria-label="View original posting or company details"
                href={`/companies/${job.companyId}`}
                className="text-xs text-default-500 justify-center gap-1"
              >
                View Company Profile
                <HeroLink.Icon aria-hidden="true" />
              </HeroLink>
            </Card.Footer>
          </Card>
        </div>

      </div>
    </div>
  );
}