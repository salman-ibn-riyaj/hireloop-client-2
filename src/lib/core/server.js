'use server'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// export const serverFetch = async (path) => {
//     const res = await fetch(`${baseUrl}${path}`)
//     return res.json();
// }

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

export const serverMutation = async (path, data) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),


    });

    // handle 401, 402, 403

    return res.json();
}