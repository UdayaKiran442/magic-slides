export async function createChatAPI(payload: { prompt: string }) {
    try {
        const response = await fetch("http://localhost:3000/chat/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        return await response.json();
    } catch (error) {

    }
}