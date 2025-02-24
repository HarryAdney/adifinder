import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Car } from 'lucide-react';
import { SearchPage } from './pages/SearchPage';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Scottish Driving Instructors
              </h1>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Find Instructor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Register as Instructor
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-400">
            © 2025 Scottish Driving Instructors Directory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;