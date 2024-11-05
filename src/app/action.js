import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { marked } from "marked"; // Import markdown library

const google = createGoogleGenerativeAI({
  apiKey: "AIzaSyB484Tyn-X4r1VQVKypqvgP6lJQVKZID1I",
});

let chatHistory = [];

export async function handleGenerateText(userInput) {
  try {
    chatHistory.push({ role: "user", content: userInput });
    const prompt = chatHistory
      .map((message) =>
        message.role === "user"
          ? `:User  ${message.content}`
          : `AI: ${message.content}`
      )
      .join("\n");

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: prompt,
      temperature: 0.1,
      system: "Response should be in brief according to the question",
    });
    chatHistory.push({ role: "ai", content: text });

    // Convert AI response to markdown
    return marked(text); // Render markdown to HTML
  } catch (error) {
    console.error("Error fetching Gemini AI response:", error);
    return null;
  }
}