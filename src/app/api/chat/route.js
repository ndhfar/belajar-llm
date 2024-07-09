import { streamText } from "ai";

const systemPrompt = "KAMU SEORANG ASISSTANT AI YANG HANDAL";
export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: "harusnya pake openai mari kita coba nanti ok!",
    system: systemPrompt,
    messages,
  });

  return result.toAIStreamResponse();
}
