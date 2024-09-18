import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Name */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">SpeedTest</h1>
              <p className="text-xs text-gray-400">Fast & Reliable</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors">
              Test Speed
            </button>
            <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
              Login
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <button className="block w-full px-4 py-2 text-left bg-blue-500 rounded hover:bg-blue-600 transition-colors">
              Test Speed
            </button>
            <button className="block w-full px-4 py-2 text-left bg-gray-700 rounded hover:bg-gray-600 transition-colors">
              Login
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
