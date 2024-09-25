import React from 'react';

function ChatMessage({ message }) {
    return (
      <div className={`flex ${message.user ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[80%] p-3 rounded-lg ${
            message.user 
              ? 'bg-violet-500 text-white' 
              : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          } shadow-md`}
        >
          <p className="text-sm md:text-base">{message.text}</p>
        </div>
      </div>
    );
}

export default ChatMessage;
