import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

let singletonClient: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY. Add it to your .env file.");
  }
  if (!singletonClient) {
    singletonClient = new GoogleGenerativeAI(apiKey);
  }
  return singletonClient;
}

export async function askGemini(prompt: string): Promise<string> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    if (!text || !text.trim()) {
      throw new Error("Empty response from model");
    }
    return text;
  } catch (err) {
    console.error("Gemini askGemini error:", err);
    throw err;
  }
}

export interface VisionJsonResult {
  name?: string;
  severity?: "low" | "medium" | "high";
  description?: string;
  treatment?: string;
}

export async function analyzeImageToJson(
  base64Data: string,
  mimeType: string,
  userPrompt?: string
): Promise<VisionJsonResult> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `${userPrompt ?? "Diagnose crop disease from the image."}
Respond ONLY as minified JSON with keys: name, severity(one of low|medium|high), description, treatment.`;

  const result = await model.generateContent([
    { text: prompt },
    {
      inlineData: {
        mimeType,
        data: base64Data,
      },
    },
  ] as any);

  const text = result.response.text().trim();
  try {
    // Remove code fences if present
    const jsonText = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "");
    return JSON.parse(jsonText) as VisionJsonResult;
  } catch {
    return { name: "Unknown", severity: "medium", description: text, treatment: "Consult agronomist." };
  }
}

export function isGeminiConfigured(): boolean {
  return Boolean(apiKey && apiKey.length > 10);
}


