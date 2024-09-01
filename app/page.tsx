"use client";

import Image from "next/image";
import StoryWriter from "@/components/StoryWriter";
import { useState } from "react";

export default function Home() {
  const [compiledStory, setCompiledStory] = useState<string>("");
  const [compiledImage, setCompiledImage] = useState<string | null>(null);

  return (
    <main className="flex-1 flex flex-col bg-white dark:bg-black transition-colors duration-500">
      <section className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <div
          className="bg-blue-500 dark:bg-gray-800 flex flex-col space-y-5 justify-center items-center order-1 lg:-order-1 pt-5 pb-5 overflow-hidden"
          style={{ height: "calc(120vh - 200px)" }} // Fixes the blue screen height
        >
          {compiledStory && (
            <div
              className="p-5 bg-white dark:bg-gray-900 dark:text-white rounded shadow-md w-11/12 overflow-y-auto sevillana-regular"
              style={{ maxHeight: "100%", overflowY: "auto" }} // Scrollable story content
            >
              {compiledImage && (
                <Image
                  src={compiledImage}
                  alt="Generated Image"
                  width={450}
                  height={200}
                  className="mb-4 lg:ml-14 border-8 border-black dark:border-gray-500"
                />
              )}
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Story</h2>
              <p className="whitespace-pre-line">{compiledStory}</p>
            </div>
          )}
        </div>

        {/* Story Section */}
        <StoryWriter
          onCompile={(story, image) => {
            setTimeout(() => {
              setCompiledStory(story);
              setCompiledImage(image);
            }, 1000);
          }}
        />
      </section>
    </main>
  );
}
