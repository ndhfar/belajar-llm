import { streamText } from "ai";

const systemPrompt = "KAMU SEORANG ASISSTANT AI YANG HANDAL";
export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: "google/gemma-2-9b-it:free",
    system: systemPrompt,
    messages,
  });

  return result.toAIStreamResponse();
}
