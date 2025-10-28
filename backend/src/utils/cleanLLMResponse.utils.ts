// Helper function to extract JSON from the markdown block
export function extractJsonFromMarkdown(text: string): string {
    // Regular expression to find content inside ```json ... ```
    const match = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
        // match[1] contains the content inside the JSON block
        return match[1].trim();
    }
    // Fallback: if no markdown block, assume the whole text is JSON
    return text.trim();
}