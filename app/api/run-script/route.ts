import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/geminiClient";

export async function POST(request: NextRequest) {
    const { story, pages } = await request.json();

    // Modify the prompt to include the pages requirement
    const prompt = story 
        ? `${story} Make sure the story is approximately ${pages} pages long.`
        : `Write a simple story about a poor man that is approximately ${pages} pages long.`;

    try {
        // Generate the story
        const result = await model.generateContent(prompt);
        const generatedText = result.response?.candidates?.[0]?.content?.parts?.map(part => part.text).join(' ') || "No output generated";

        // Generate the image
        const imageResponse = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!imageResponse.ok) {
            throw new Error("Failed to generate image");
        }

        const arrayBuffer = await imageResponse.arrayBuffer();  // Get the raw image data
        const base64Image = Buffer.from(arrayBuffer).toString('base64');  // Convert to base64

        // Return the story and image in the response
        return NextResponse.json({
            story: generatedText,
            image: `data:image/png;base64,${base64Image}`
        });
    } catch (error) {
        return NextResponse.json({
            error: (error instanceof Error) ? error.message : 'An unknown error occurred'
        }, { status: 500 });
    }
}
