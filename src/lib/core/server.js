'use server'

import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// export const serverFetch = async (path) => {
//     const res = await fetch(`${baseUrl}${path}`)
//     return res.json();
// }

export const authHeader = async () => {
    const token = await getUserToken();

    const header = token ? {
        'Authorization': `Bearer ${token}`
    } : {}

    return header;
}

export const serverFetch = async (path) => {
    try {
        const res = await fetch(`${baseUrl}${path}`);

        // ✅ Check status
        if (!res.ok) {
            console.error(`API Error: ${res.status}`);
            return null;  // ← Return null instead of crashing
        }

        // ✅ Get text first
        const text = await res.text();

        // ✅ Check if empty
        if (!text || text.trim() === "") {
            console.warn("Empty response");
            return null;
        }

        // ✅ Safe parse
        const data = JSON.parse(text);
        return data;

    } catch (error) {
        console.error("Fetch error:", error);
        return null;  // ← Never crash
    }
}

export const protectedFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        headers: await authHeader()
    })

     return handleStatusCodes(res);
}

export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader()
        },
        body: JSON.stringify(data),


    });

    // handle 401, 402, 403
    console.log('serverMutation response status:', res.status);

    return handleStatusCodes(res);
}

const handleStatusCodes = (res) => {
    if (res.status === 401) {
        redirect('/unauthorized');
    }
    else if (res.status === 403) {
        redirect('/unauthorized');
    }

    return res.json();
}