import { GoogleGenAI } from "@google/genai";
import { extractJsonFromMarkdown } from "../utils/cleanLLMResponse.utils";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});


export async function generatePresentationService(prompt: string) {
  try {
    const response = await gemini.models.generateContent({
      model: "gemini-2.5-pro", // Using the required model
      contents: `You are a ppt slides generator. Follow the instructions and prompt from user to generate a structured JSON object.

            User Prompt: ${prompt}

            Instructions:
            1. Generate slides with accordance to PptxGenJS npm package slide object structure.
            2. **CRITICAL:** Output ONLY the single JSON object. Do not include any text before or after the JSON.
            3. Enclose the single JSON object within a JSON markdown block (e.g., \`\`\`json{...}\`\`\`).
            4. The output JSON must contain two top-level fields: "title" (a string for the chat/presentation title based on the prompt) and "slides" (an array of slide objects).
            5. Use the following terminologies for slide elements: "x", "y", "w", "h" (coordinates/dimensions), "text" (text content), "type" ("text" or "image"), "options" (styling).
            6. For images, use the **imageURL** field to provide a relevant, publicly accessible image URL. Generate relevant images for the slides wherever necessary.
            7. Use appropriate font sizes for headings and content.
            8. Use bullet points for content wherever necessary.

            Generate the JSON object in the **exact format** below:
            \`\`\`json
            {
              "title": "Generated Chat Title Based on Prompt",
              "slides": [
                {
                    "slideNumber": 1,
                    "slideTitle": "Title of this Slide",
                    "content": [
                        {  
                            "type": "text" | "image",
                            "text"?: "Slide element text",
                            "imageURL"?: "Image URL string",
                            "options": {
                                "x": 1, 
                                "y": 1, 
                                "w": 8, 
                                "h": 0.5,
                                "fontSize": 24,
                                "color": "000000",
                                "align": "center"
                            }
                        }
                    ]
                }
                // ... more slide objects
              ]
            }
            \`\`\`
            `,
    });

    // --- PARSING LOGIC REMAINS THE SAME BUT NOW PARSES THE NEW STRUCTURE ---
    const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // The extractJsonFromMarkdown function successfully pulls the JSON string
    // out of the ```json...``` block, regardless of whether it's an array or object.
    const jsonString = extractJsonFromMarkdown(rawText);

    // JSON.parse converts the string into the final JavaScript object:
    // { title: string, slides: Array<SlideObject> }
    const parsedContent = JSON.parse(jsonString);

    console.log(
      "🚀 ~ generatePresentationService ~ parsedContent:",
      parsedContent
    );
    return parsedContent;
  } catch (error) {
    console.error("generatePresentationService error:", error);
    throw error;
  }
}
