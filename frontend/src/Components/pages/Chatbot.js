// src/Chatbot.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/chatbot', { message: input });
      setResponses([...responses, { message: input, reply: response.data.reply }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Chat with Our Health Assistant</h1>
      <div className="chat-box bg-white p-4 rounded shadow-md">
        {responses.map((res, index) => (
          <div key={index} className="chat-message mb-2">
            <p><strong>You:</strong> {res.message}</p>
            <p><strong>Bot:</strong> {res.reply}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
