// File: /lib/geminiClient.ts
// File: /lib/geminiClient.ts
// File: /lib/geminiClient.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure that the API key is correctly set
const apiKey = "AIzaSyCta6NhJzc-B734-vH70s_L6Wq0vvcTO_M";
if (!apiKey) {
    throw new Error("API key is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
