"use server";

import { parsingJSON } from "@/libs/parsingJson";

export async function generateRecipeAction(_, formData) {
  const ingredients = formData.get("ingredients");
  const cuisine = formData.get("cuisine");

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
            "RESULT SHOULD BE ONLY IN VALID JSON FORMAT WITH FOLLOWING KEYS: dishName, dishDescription, ingredients, instruction, errorMessage. ERROR MESSAGE ONLY WHEN THERE IS UNEDIBLE INGREDIENTS. VALIDATE THE RESULT WHEN THERE IS INEDIBLE INGREDIENTS DO IGNORE IT AND DO NOT INCLUDE IN INGREDIENT LIST. JUST SIMPLY EXCLUDE IT",
        },
        {
          role: "user",
          content: `Generate dish recipe with from following ingredients: ${ingredients} in ${cuisine} style`,
        },
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
