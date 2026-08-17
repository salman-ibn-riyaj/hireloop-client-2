"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Button,
  Chip,
  Input,
  Label,
  ListBox,
  Select,
  Switch,
  TextArea
} from "@heroui/react";
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiGlobe,
  FiMapPin,
  FiX
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import { createJob } from "@/lib/actions/jobs";

export default function PostJobPage() {
  const router = useRouter();

  const companyInfo = {
    name: "Acme Corp",
    isApproved: true,
    plan: "Growth",
    currentJobsCount: 4,
    jobLimit: 10,
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "technology",
    type: "full-time",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    location: "",
    isRemote: false,
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  const isLimitReached = companyInfo.currentJobsCount >= companyInfo.jobLimit;
  const canPost = companyInfo.isApproved && !isLimitReached;

  // Safe handler supporting DOM events, direct booleans, and values
  const handleChange = (field, valOrEvent) => {
    let value = valOrEvent;
    if (valOrEvent && typeof valOrEvent === "object" && "target" in valOrEvent) {
      value =
        valOrEvent.target.type === "checkbox"
          ? valOrEvent.target.checked
          : valOrEvent.target.value;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canPost) return;

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        companyId: companyInfo.name,
        status: "active",
        isPublic: true,
        createdAt: new Date().toISOString(),
      };

      const res = await createJob(payload);

      if (res?.insertedId || res?.acknowledged) {
        // Styled Custom Dark-Theme Toast
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-sm w-full bg-zinc-900 border border-emerald-500/30 shadow-2xl rounded-xl pointer-events-auto flex items-center p-4 gap-3 text-zinc-100 ring-1 ring-black/5`}
            >
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white tracking-tight">
                  Job Published Successfully!
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                  Your listing is live and visible to job seekers.
                </p>
              </div>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ),
          { duration: 4000 }
        );

        e.target.reset();
        router.push("/dashboard/recruiter/jobs");
      } else {
        toast.error("Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonInputStyles =
    "w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-600 hover:border-zinc-700 text-zinc-100 placeholder:text-zinc-500 rounded-lg text-sm transition-colors outline-none px-3 py-2.5";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-[#141416] border border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800/80 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-white tracking-tight">
              Post a New Job
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Create a new job listing to start receiving applications on HireLoop.
            </p>
          </div>
          <button
            type="button"
            className="text-zinc-400 hover:text-zinc-200 transition-colors p-1"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Company Status Bar */}
        <div className="px-6 py-3 bg-zinc-900/40 border-b border-zinc-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <FaBuilding className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-400">Posting as:</span>
            <span className="font-medium text-zinc-200">{companyInfo.name}</span>
            {companyInfo.isApproved && (
              <Chip
                color="success"
                className="h-5 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 flex items-center gap-1 rounded-full"
              >
                <FiCheckCircle className="w-3 h-3 inline mr-1" />
                Approved
              </Chip>
            )}
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>
              Active Limit:{" "}
              <strong className="text-zinc-200">
                {companyInfo.currentJobsCount}/{companyInfo.jobLimit}
              </strong>{" "}
              ({companyInfo.plan} Plan)
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Section 1: Job Info */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              1. Job Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Title */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-300 font-medium text-xs">
                  Job Title
                </Label>
                <div className="relative flex items-center">
                  <FiBriefcase className="absolute left-3 w-4 h-4 text-zinc-500" />
                  <Input
                    aria-label="Job Title"
                    placeholder="e.g. Senior Frontend Developer"
                    className={`${commonInputStyles} pl-9`}
                    value={formData.title}
                    onChange={(e) => handleChange("title", e)}
                    required
                  />
                </div>
              </div>

              {/* Industry / Category */}
              <div className="flex flex-col gap-1.5">
                <Select
                  className="w-full"
                  placeholder="Select category"
                  value={formData.category}
                  onChange={(val) => handleChange("category", val)}
                >
                  <Label className="text-zinc-300 font-medium text-xs mb-1.5">
                    Industry / Category
                  </Label>
                  <Select.Trigger className={`${commonInputStyles} flex items-center justify-between cursor-pointer`}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg p-1 shadow-xl text-zinc-100 text-sm">
                    <ListBox>
                      <ListBox.Item id="technology" textValue="Technology & Software" className="p-2 hover:bg-zinc-800 rounded cursor-pointer flex items-center justify-between">
                        Technology & Software
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="design" textValue="Design & Creative" className="p-2 hover:bg-zinc-800 rounded cursor-pointer flex items-center justify-between">
                        Design & Creative
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="marketing" textValue="Marketing & Sales" className="p-2 hover:bg-zinc-800 rounded cursor-pointer flex items-center justify-between">
                        Marketing & Sales
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="finance" textValue="Finance & Accounting" className="p-2 hover:bg-zinc-800 rounded cursor-pointer flex items-center justify-between">
                        Finance & Accounting
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Type */}
              <div className="flex flex-col gap-1.5">
                <Select
                  className="w-full"
                  placeholder="Select employment type"
                  value={formData.type}
                  onChange={(val) => handleChange("type", val)}
                >
                  <Label className="text-zinc-300 font-medium text-xs mb-1.5">
                    Job Type
                  </Label>
                  <Select.Trigger className={`${commonInputStyles} flex items-center justify-between cursor-pointer`}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg p-1 shadow-xl text-zinc-100 text-sm">
                    <ListBox>
                      <ListBox.Item id="full-time" textValue="Full-time" className="p-2 hover:bg-zinc-800 rounded cursor-pointer flex items-center justify-between">
                        Full-time
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="part-time" textValue="Part-time" className="p-2 hover:bg-zinc-800 rounded cursor-pointer flex items-center justify-between">
                        Part-time
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="contract" textValue="Contract" className="p-2 hover:bg-zinc-800 rounded cursor-pointer flex items-center justify-between">
                        Contract
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="internship" textValue="Internship" className="p-2 hover:bg-zinc-800 rounded cursor-pointer flex items-center justify-between">
                        Internship
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Deadline */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-300 font-medium text-xs">
                  Application Deadline
                </Label>
                <div className="relative flex items-center">
                  <FiCalendar className="absolute left-3 w-4 h-4 text-zinc-500" />
                  <Input
                    type="date"
                    aria-label="Application Deadline"
                    className={`${commonInputStyles} pl-9`}
                    value={formData.deadline}
                    onChange={(e) => handleChange("deadline", e)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-300 font-medium text-xs">
                  Min Salary
                </Label>
                <Input
                  type="number"
                  aria-label="Min Salary"
                  placeholder="50000"
                  className={commonInputStyles}
                  value={formData.salaryMin}
                  onChange={(e) => handleChange("salaryMin", e)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-300 font-medium text-xs">
                  Max Salary
                </Label>
                <Input
                  type="number"
                  aria-label="Max Salary"
                  placeholder="80000"
                  className={commonInputStyles}
                  value={formData.salaryMax}
                  onChange={(e) => handleChange("salaryMax", e)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Select
                  className="w-full"
                  placeholder="Currency"
                  value={formData.currency}
                  onChange={(val) => handleChange("currency", val)}
                >
                  <Label className="text-zinc-300 font-medium text-xs mb-1.5">
                    Currency
                  </Label>
                  <Select.Trigger className={`${commonInputStyles} flex items-center justify-between cursor-pointer`}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg p-1 shadow-xl text-zinc-100 text-sm">
                    <ListBox>
                      <ListBox.Item id="USD" textValue="USD ($)" className="p-2 hover:bg-zinc-800 rounded cursor-pointer flex items-center justify-between">
                        USD ($)
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="EUR" textValue="EUR (€)" className="p-2 hover:bg-zinc-800 rounded cursor-pointer flex items-center justify-between">
                        EUR (€)
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="BDT" textValue="BDT (৳)" className="p-2 hover:bg-zinc-800 rounded cursor-pointer flex items-center justify-between">
                        BDT (৳)
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Location & Remote */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <Label className="text-zinc-300 font-medium text-xs">
                  Location
                </Label>
                <div className="relative flex items-center">
                  <FiMapPin className="absolute left-3 w-4 h-4 text-zinc-500" />
                  <Input
                    aria-label="Location"
                    placeholder="e.g. San Francisco, CA"
                    disabled={formData.isRemote}
                    className={`${commonInputStyles} pl-9 transition-all ${
                      formData.isRemote ? "opacity-50 cursor-not-allowed bg-zinc-900/40" : ""
                    }`}
                    value={formData.location}
                    onChange={(e) => handleChange("location", e)}
                  />
                </div>
              </div>

              {/* Remote Toggle Box */}
              <div
                className={`h-[42px] flex items-center justify-between px-3 rounded-lg border transition-colors ${
                  formData.isRemote
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-zinc-800 bg-zinc-900/80"
                }`}
              >
                <span className="text-xs text-zinc-300 flex items-center gap-1.5">
                  <FiGlobe
                    className={`w-4 h-4 transition-colors ${
                      formData.isRemote ? "text-emerald-400" : "text-zinc-400"
                    }`}
                  />
                  Remote Job
                </span>
                <Switch
                  isSelected={formData.isRemote}
                  onChange={(isSelected) => handleChange("isRemote", isSelected)}
                >
                  <Switch.Content>
                    <Switch.Control
                      className={`w-9 h-5 rounded-full flex items-center px-0.5 border cursor-pointer transition-colors ${
                        formData.isRemote
                          ? "bg-emerald-500 border-emerald-400"
                          : "bg-zinc-800 border-zinc-700"
                      }`}
                    >
                      <Switch.Thumb
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-200 transform ${
                          formData.isRemote
                            ? "bg-white translate-x-4 shadow-sm"
                            : "bg-zinc-400 translate-x-0"
                        }`}
                      />
                    </Switch.Control>
                  </Switch.Content>
                </Switch>
              </div>
            </div>
          </div>

          <hr className="border-zinc-800/80" />

          {/* Section 2: Descriptions */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              2. Descriptions & Requirements
            </h2>

            <div className="flex flex-col gap-1.5">
              <Label className="text-zinc-300 font-medium text-xs">
                Responsibilities
              </Label>
              <TextArea
                aria-label="Responsibilities"
                placeholder="Outline key duties and daily tasks expected in this role..."
                className={`${commonInputStyles} h-28 resize-y`}
                value={formData.responsibilities}
                onChange={(e) => handleChange("responsibilities", e)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-zinc-300 font-medium text-xs">
                Requirements
              </Label>
              <TextArea
                aria-label="Requirements"
                placeholder="List required skills, qualifications, and years of experience..."
                className={`${commonInputStyles} h-28 resize-y`}
                value={formData.requirements}
                onChange={(e) => handleChange("requirements", e)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-zinc-300 font-medium text-xs">
                Benefits & Perks (Optional)
              </Label>
              <TextArea
                aria-label="Benefits & Perks"
                placeholder="e.g. Health insurance, 401(k) matching, flexible working hours..."
                className={`${commonInputStyles} h-20 resize-y`}
                value={formData.benefits}
                onChange={(e) => handleChange("benefits", e)}
              />
            </div>
          </div>

          {/* Limit Warning Banner */}
          {isLimitReached && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-400">
              You have reached your active job posting limit ({companyInfo.jobLimit} jobs) for the {companyInfo.plan} plan. Upgrade your subscription to publish more positions.
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-end gap-3">
            <Button
              type="button"
              className="bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 font-medium px-5 py-2 rounded-lg text-xs transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!canPost || isSubmitting}
              className="bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-semibold px-6 py-2 rounded-lg text-xs transition-colors"
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}