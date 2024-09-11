import { useState } from 'react';
import './App.css';

function Home({getReport}) {
    const [Url,setUrl] = useState('');
    let handleChangeUrl = (e) => {
      setUrl(e.target.value);
    }
    let handleSubmition = () => {
      getReport(Url);
    }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Website Speed Test</h1>
        <p className="text-gray-600 text-center mb-8">
          Enter your details below to analyze your website speed
        </p>

        <form  className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
             
              required
            />
          </div>

          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              Website URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="https://yourwebsite.com"
              onChange={handleChangeUrl}
              value={Url}
              required
            />
          </div>

          <div>
            <button
              onClick={handleSubmition}
              type="button"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Test Website Speed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
