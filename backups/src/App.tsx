//import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Car } from "lucide-react";
import { SearchPage } from "./pages/SearchPage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Car className="w-8 h-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Driving Instructor Directory
              </h1>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 transition-colors hover:text-blue-600"
                  >
                    Find an Instructor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-gray-600 transition-colors hover:text-blue-600"
                  >
                    Register as an Instructor
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <img
          src="/adifinder-header.webp"
          alt="Driving Instructor Header"
          className="w-full h-auto"
        />
      </header>

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <footer className="mt-12 text-white bg-gray-800">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            © Copyright 2025 HarryAdney Web Design. All rights reserved. Updated
            27 02 2025 14:39
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
