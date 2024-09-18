import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Generating Lighthouse Report</h2>
        <p className="text-gray-600 mb-4">This may take up to 80s Please wait...</p>
        <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <div className="w-full h-full bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;