import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getCompanyJobs = async (companyId, status="active") => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}

// export const getJobs = async () => {
//     return serverFetch('/api/jobs')
// }


// lib/api/jobs.js

export const getJobs = async (filters = {}) => {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, String(value));
        }
    });

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/api/jobs?${queryString}` : '/api/jobs';

    return serverFetch(endpoint);
};


export const getJobsById = async (jobId) => {
    return serverFetch(`/api/jobs/${jobId}`)
}
