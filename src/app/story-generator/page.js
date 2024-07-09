"use client";

import { useActionState } from "react";
import { generateStoryAction } from "./action";

export default function Home() {
  const [state, formAction, pending] = useActionState(
    generateStoryAction,
    null
  );
  return (
    <main className="max-w-2xl mx-auto bg-slate-200 px-4 py-2 space-y-2">
      <h1 className="font-bold text-3xl text-center">Baby Story Generator</h1>
      <form className="flex flex-col space-y-2" action={formAction}>
        <input
          name="prompt"
          placeholder="Generate a baby story before bed, about bestfriend..."
          required
          className="outline-none px-2 py-1 rounded-md"
        />
        <button
          disabled={pending}
          className="bg-indigo-600 px-2 py-1 rounded-md text-white"
        >
          Generate Story
        </button>
      </form>
      <section>
        {state?.status === "success" && (
          <div className="space-y-2">
            <h1 className="font-bold text-2xl text-center">
              {state.data.title}
            </h1>
            <div>
              <h2 className="text-xl font-bold">Characters:</h2>
              <ul className="px-5 list-disc">
                {state.data.characters.map((character, index) => {
                  return <li key={index}>{character}</li>;
                })}
              </ul>
            </div>
            <p className="text-justify">{state.data.story}</p>
            <p className="text-center">"{state.data.moralLessons}"</p>
          </div>
        )}
      </section>
    </main>
  );
}
