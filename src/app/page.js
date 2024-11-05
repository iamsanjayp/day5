"use client";
import { useState, useEffect, useRef } from "react";
import { handleGenerateText } from "./action"; // Import the action for handling text generation

export default function Home() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", content: "Gemini AI response will appear here!" },
  ]);
  const chatContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input) {
      const userMessage = { role: "user", content: input };
      const generatedText = await handleGenerateText(input);
      const aiMessage = {
        role: "ai",
        content:
          generatedText || "Error: Could not fetch response from Gemini AI.",
      };

      setChatHistory([...chatHistory, userMessage, aiMessage]);
      setInput(""); // Clear the input field
    } else {
      alert("Please enter some text.");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="layout-container">
      <main>
        <div ref={chatContainerRef} className="chat-container">
          {chatHistory.map((message, index) => (
            <div key={index} className={`chat-bubble ${message.role}`}>
              <p dangerouslySetInnerHTML={{ __html: message.content }}></p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here"
            className="input-field"
          />
          <button type="submit" className="submit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="20px"
              height="20px"
            >
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        </form>
      </main>
    </div>
  );
}