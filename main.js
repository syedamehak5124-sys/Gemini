import { API_KEY } from "./env.js";
import { getPrompt } from "./prompt.js";
import Groq from "groq-sdk";
const helpButton = document.querySelector("#help");
const helpBody = document.querySelector("#help-body");
const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser:true });
helpButton.addEventListener("click", async () => {
  helpBody.textContent = "Loading...";
  //
  try {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
  messages: [
    { 
        role: "system", 
        content: "You are a helpful assistant. Answer the user's question based on the FAQs provided below. Do not show all FAQs, only answer the specific question." 
    },
    { 
        role: "user", 
        content: `FAQs: ${getPrompt()} \n\n Question: How can I reset my password?` 
    }
],
    max_tokens: 1024,
  });

const userQuestion = "How can I reset my password?";
    const aiAnswer = response.choices[0].message.content;
    helpBody.innerHTML = `<strong>${userQuestion}</strong><br><br>${aiAnswer}`;
} catch (error) {
  console.error("Error fetching help:", error);
  console.error("Error details:", error.message);
  helpBody.textContent = `Error: ${error.message || "Couldn't load help content"}`;
}
});

