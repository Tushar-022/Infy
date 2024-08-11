// src/components/pages/NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden text-center p-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">404</h1>
        <p className="text-xl md:text-2xl">Page Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;
