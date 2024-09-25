import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'AIzaSyAmfv5ML6txGnCXH3-7AYD-UwT57yj3VmI';
const genAI = new GoogleGenerativeAI(API_KEY);


export async function getGeminiResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const context = `You are a student-friendly AI assistant specializing in answering a wide range of educational topics. 
  Provide concise, easy-to-understand answers about various subjects, including science, mathematics, literature, and technology. 
  If the question is not clear or educational in nature, politely ask for clarification or redirect the user towards educational topics. 
  Keep responses brief and engaging, suitable for students with limited attention spans.`;

  const fullPrompt = `${context}\n\nUser question: ${prompt}\n\nResponse:`;

  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
