import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { getGeminiResponse } from '../services/geminiService';

function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { 
      text: "Hi there! I'm your friendly educational assistant. What topic would you like to explore today?", 
      user: false 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getGeminiResponse(input);
      const botMessage = { text: response, user: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error getting response from Gemini:', error);
      const errorMessage = { text: 'Sorry, I encountered an error. Please try again.', user: false };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-violet-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 overflow-hidden flex flex-col">
      <div className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h3 className="text-2xl font-bold text-violet-600 dark:text-violet-400">Ask Guru</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-lg">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
          <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about any educational topic..."
              className="flex-grow px-4 py-2 bg-transparent focus:outline-none dark:text-gray-100"
            />
            <button
              type="submit"
              className="bg-violet-500 text-white px-6 py-2 hover:bg-violet-600 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
