"use client";

import React, { useState } from "react";
import {
    Card,
    Form,
    TextField,
    Label,
    Input,
    TextArea,
    Description,
    FieldError,
    Button,
} from "@heroui/react";
import { submitApplication } from "@/lib/actions/applications";
import toast from "react-hot-toast";

const JobApply = ({ applicant, job }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const payload = {
            ...data,
            jobId: job?._id,
            jobTitle: job?.title,
            companyName: job?.companyName,
            applicantName: applicant?.name,
            applicantEmail: applicant?.email,
            applicantId: applicant?.id,
        };

        console.log("Job Application Payload:", payload);

        const res = await submitApplication(payload);
        if (res.applicantId) {
            toast.success("Application submitted successfully");
        } else {
            toast.error("Failed to submit application");
        }

        setIsSubmitting(false);
    };

    return (
        <div className="w-full min-h-screen px-3 py-6 sm:px-6 md:py-12 flex justify-center items-center bg-background">
            <Card className="w-full max-w-2xl mx-auto shadow-xl border border-default-200/60 rounded-2xl overflow-hidden transition-all">
                {/* Header */}
                <Card.Header className="px-5 pt-6 pb-4 sm:px-8 sm:pt-8 flex flex-col items-start gap-1 bg-default-50/50 border-b border-default-100">
                    <Card.Title className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                        Apply for {job?.title || "Position"}
                    </Card.Title>
                    {job?.company && (
                        <Card.Description className="text-sm sm:text-base text-default-500 font-medium">
                            {job.company}
                        </Card.Description>
                    )}
                </Card.Header>

                {/* Form Container */}
                <Form onSubmit={handleSubmit} className="w-full">
                    <Card.Content className="p-5 sm:p-8 flex flex-col gap-6">

                        {/* Field 1: Resume Link */}
                        <TextField
                            isRequired
                            name="resumeUrl"
                            type="url"
                            className="flex flex-col gap-1.5 w-full"
                            validate={(value) => {
                                if (!value) return "Resume link is required";
                                try {
                                    new URL(value);
                                } catch (_) {
                                    return "Please enter a valid URL (e.g., https://drive.google.com/...)";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-xs sm:text-sm font-bold tracking-wide text-foreground uppercase flex items-center gap-1">
                                Resume Link <span className="text-danger">*</span>
                            </Label>
                            <Input
                                placeholder="https://drive.google.com/file/d/..."
                                className="w-full px-4 py-2.5 text-sm sm:text-base rounded-lg bg-default-100/70 border border-default-200 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            />
                            <Description className="text-xs text-default-500 font-normal mt-0.5">
                                Provide a public link to your resume (Google Drive, Dropbox, Notion, etc.)
                            </Description>
                            <FieldError className="text-xs text-danger font-medium mt-0.5" />
                        </TextField>

                        {/* Field 2: Portfolio Website */}
                        <TextField
                            name="portfolioUrl"
                            type="url"
                            className="flex flex-col gap-1.5 w-full"
                            validate={(value) => {
                                if (value && value.trim() !== "") {
                                    try {
                                        new URL(value);
                                    } catch (_) {
                                        return "Please enter a valid URL (e.g., https://yourportfolio.com)";
                                    }
                                }
                                return null;
                            }}
                        >
                            <Label className="text-xs sm:text-sm font-bold tracking-wide text-foreground uppercase">
                                Portfolio Website <span className="text-default-400 font-normal lowercase">(optional)</span>
                            </Label>
                            <Input
                                placeholder="https://yourportfolio.com"
                                className="w-full px-4 py-2.5 text-sm sm:text-base rounded-lg bg-default-100/70 border border-default-200 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            />
                            <Description className="text-xs text-default-500 font-normal mt-0.5">
                                Link to your personal website, GitHub, or Dribbble profile
                            </Description>
                            <FieldError className="text-xs text-danger font-medium mt-0.5" />
                        </TextField>

                        {/* Field 3: Why Should We Hire You */}
                        <TextField
                            isRequired
                            name="notes"
                            className="flex flex-col gap-1.5 w-full"
                            validate={(value) => {
                                if (!value || value.trim().length < 30) {
                                    return "Please write at least 30 characters explaining why you're a great fit.";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-xs sm:text-sm font-bold tracking-wide text-foreground uppercase flex items-center gap-1">
                                Why should we hire you? <span className="text-danger">*</span>
                            </Label>
                            <TextArea
                                placeholder="Tell us about your relevant experience, key achievements, and why you're excited about this role..."
                                rows={5}
                                className="w-full p-4 text-sm sm:text-base rounded-lg bg-default-100/70 border border-default-200 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-y min-h-[120px]"
                            />
                            <Description className="text-xs text-default-500 font-normal mt-0.5">
                                Minimum 30 characters
                            </Description>
                            <FieldError className="text-xs text-danger font-medium mt-0.5" />
                        </TextField>

                    </Card.Content>

                    {/* Footer Actions (Responsive Buttons) */}
                    <Card.Footer className="px-5 py-4 sm:px-8 sm:py-6 flex flex-col-reverse sm:flex-row justify-end items-center gap-3 bg-default-50/50 border-t border-default-100">
                        <Button
                            type="reset"
                            variant="flat"
                            color="default"
                            className="w-full sm:w-auto px-6 py-2.5 font-medium text-sm"
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            isLoading={isSubmitting}
                            className="w-full sm:w-auto px-8 py-2.5 font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                        >
                            Submit Application
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </div>
    );
};

export default JobApply;