"use client";

import { useActionState } from "react";
import { generateRecipeAction } from "./action";

export default function Home() {
  const [state, formAction, pending] = useActionState(generateRecipeAction);
  return (
    <main className="max-w-2xl mx-auto bg-slate-200 px-4 py-2 space-y-2">
      <h1 className="font-bold text-3xl text-center">Meal Recipe Generator</h1>
      <form className="flex flex-col space-y-2" action={formAction}>
        <input
          name="ingredients"
          placeholder="Enter your ingredients ie. chicken, tofu, .."
          required
          className="outline-none px-2 py-1 rounded-md"
        />
        <select name="cuisine" className="outline-none px-2 py-1 rounded-md">
          <option>American</option>
          <option>Chinese</option>
          <option>Japan</option>
          <option>Korean</option>
          <option>Indonesia</option>
        </select>
        <button
          className="bg-indigo-600 px-2 py-1 rounded-md text-white"
          disabled={pending}
        >
          Generate
        </button>
      </form>
      <section>
        {state?.status === "success" && (
          <div className="py-2 space-y-2">
            <div className="text-center">
              <h1 className="font-bold text-2xl ">{state.data.dishName}</h1>
              <p>{state.data.dishDescription}</p>
            </div>
            <div>
              <h1 className="font-bold text-xl">Ingredients:</h1>
              <ol className="px-5 list-disc">
                {state.data.ingredients.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ol>
            </div>
            <div>
              <h1 className="font-bold text-xl">Instruction: </h1>
              <ol className="px-4 list-decimal text-justify pb-2">
                {state.data.instruction.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ol>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
