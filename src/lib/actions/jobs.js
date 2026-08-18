"use server"

import { serverMutation } from "../core/server"

export const  createJob = async (jobData) => {
    return serverMutation('/api/jobs', jobData)
}

// const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// export const createJob = async (jobData) => {
//     const res = await fetch(`${baseUrl}/api/jobs`,{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(jobData),
//     })

//     return res.json();
// }