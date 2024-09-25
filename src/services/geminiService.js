import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'AIzaSyAmfv5ML6txGnCXH3-7AYD-UwT57yj3VmI';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getGeminiResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const context = `You are a student-friendly AI assistant specializing in deep learning concepts. 
  Provide concise, easy-to-understand answers about deep learning topics only. 
  If the question is not related to deep learning, politely redirect the user to ask about deep learning concepts. 
  Keep responses brief and engaging for students with limited attention spans.`;

  const fullPrompt = `${context}\n\nUser question: ${prompt}\n\nResponse:`;

  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
