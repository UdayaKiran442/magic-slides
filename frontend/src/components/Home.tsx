"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { createChatAPI } from "@/actions/chat.actions";

export const Home = () => {
  const [prompt, setPrompt] = React.useState("");
  const router = useRouter();

  async function onSubmit() {
    try {
      const response = await createChatAPI({ prompt });
      if (response.success) {
        router.push(`/chat/${response.chat._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1 className="text-4xl font-bold">Welcome to Magic Slides!</h1>
      <p className="mt-4 text-lg">
        Create stunning presentations effortlessly with AI-powered slide
        generation.
      </p>
      {/* input box */}
      <div className="mt-8">
        <input
          type="text"
          placeholder="Enter your prompt here..."
          className="w-[50%] rounded-md border border-gray-300 p-2"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={onSubmit}
          className="ml-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Generate Slides
        </button>
      </div>
    </div>
  );
};
