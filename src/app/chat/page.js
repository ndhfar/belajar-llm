"use client";

import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });
  return (
    <main className="flex justify-between flex-col min-h-screen max-w-2xl mx-auto py-12">
      <section>
        {messages.map((message) => {
          if (message.role === "user") {
            return (
              <div key={message.id} className="flex justify-end">
                <div className="text-right bg-slate-100 w-fit px-2 py-1 rounded-xl">
                  {message.content}
                </div>
              </div>
            );
          }
          return (
            <div
              key={message.id}
              className="text-left bg-blue-100 w-fit px-2 py-1 rounded-xl"
            >
              {message.content}
            </div>
          );
        })}
      </section>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Chat disini..."
          type="text"
          required
          className="w-full outline-none border border-slate-200 px-4 py-2 rounded-lg bg-slate-100"
          value={input}
          onChange={handleInputChange}
        />
      </form>
    </main>
  );
}
