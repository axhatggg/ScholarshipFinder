// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-around">
        {/* Site Name / Logo */}
        <Link to="/" className="text-indigo-600 text-2xl font-bold">
          Scholar Track
        </Link>

        {/* Nav Links */}
        <div className="space-x-6">
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-800 transition"
          >
            Home
          </Link>
          <a
            href="#features"
            className="text-indigo-600 hover:text-indigo-800 transition"
          >
            Features
          </a>
          <a
            href="#contact"
            className="text-indigo-600 hover:text-indigo-800 transition"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}