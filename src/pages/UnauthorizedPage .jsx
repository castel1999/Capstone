import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md px-4 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Unauthorized</h2>
        <p className="text-gray-600 mb-4">You are not authorized to access this page.</p>
        <Link
          to="/"
          className="inline-block bg-blue-500 text-black py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
