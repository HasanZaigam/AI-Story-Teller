"use client";

import { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Button } from './ui/button';
import Image from 'next/image';

interface StoryWriterProps {
  onCompile: (story: string, image: string) => void;
}

function StoryWriter({ onCompile }: StoryWriterProps) {
  const [Story, SetStory] = useState<string>("");
  const [Pages, SetPages] = useState<number | undefined>(undefined);
  const [GeneratedStory, SetGeneratedStory] = useState<string>("");
  const [GeneratedImage, SetGeneratedImage] = useState<string | null>(null);
  const [RunStarted, SetRunStarted] = useState<boolean>(false);
  const [RunFinished, SetRunFinished] = useState<boolean | null>(null);

  async function RunScript() {
    SetRunStarted(true);
    SetRunFinished(false);

    const response = await fetch('/api/run-script', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ story: Story, pages: Pages }),
    });

    const data = await response.json();
    SetGeneratedStory(data.story || "No story generated");
    SetRunFinished(true);
    SetRunStarted(false);

    // Call the onCompile prop after the story and image are generated
    onCompile(data.story || "No story generated", data.image || null);
  }

  return (
    <div className="flex flex-col container">
      <section className='flex-1 flex flex-col border border-blue-300 rounded-md p-10 space-y-2'>
        <Textarea
          value={Story}
          onChange={(e) => SetStory(e.target.value)}
          className='flex-1 text-black dark:text-white'
          placeholder='Write a story about a poor man...'
        />

        <Select onValueChange={(value) => SetPages(parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder="How many pages should the story be?" />
          </SelectTrigger>

          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => (
              <SelectItem key={i} value={String(i + 1)}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          disabled={!Story || !Pages || RunStarted}
          className='w-full lg hover:bg-green-500 dark:hover:bg-green-500 dark:bg-blue-700 hover:text-black'
          onClick={RunScript}
        >
          Generate Story and Image
        </Button>
      </section>

      <section className='flex-1 pb-5 mt-5'>
        <div className='flex flex-col-reverse w-full bg-gray-900 rounded-md text-green-400 font-mono p-5 h-96 overflow-y-auto'>
          <div className="mb-4">
            {RunStarted && !RunFinished && (
              <p className='animate-pulse text-lg'>
                {"------The AI Story is Generating------"}
              </p>
            )}
            {RunFinished === null && (
              <p className='animate-pulse '>
                $ Waiting for you to generate a story...
              </p>
            )}
            {RunFinished && (
              <>
                <h1 className="text-2xl font-bold mb-4 text-white">$ Story </h1>
                <p className="whitespace-pre-line">{`$ ${GeneratedStory}`}</p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default StoryWriter;
