"use server";

import { parsingJSON } from "@/libs/parsingJson";

export async function generateStoryAction(_, formData) {
  const prompt = formData.get("prompt");

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_APIKEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemma-2-9b-it:free",
      messages: [
        {
          role: "system",
          content:
            "YOU ARE A GREAT STORY TELLER FOR KIDS, YOU ALWAYS INCLUDE MORAL LESSONS IN EVERY SINGLE STORY. THE STORY SHOULD BE BETWEEN 8-12 SENTENCES. THE OUTPUT SHOULD BE ONLY VALID JSON WITH FOLLOWING KEYS: title, characters, story, moralLessons",
        },
        { role: "user", content: `${prompt}` },
      ],
    }),
  });
  const data = await res.json();
  const result = parsingJSON(data.choices[0].message.content);

  return {
    status: "success",
    data: result,
  };
}
