import React, { useState } from 'react';
import { Home, Activity, Zap, BarChart2, Settings, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Overview', icon: Home, path: '/Overview' },
    { name: 'Web Vitals', icon: Activity, path: '/Web-Vitals' },
    { name: 'Performance', icon: Zap, path: '/Performance' },
    { name: 'Analytics', icon: BarChart2, path: '/Analytics' },
    { name: 'Settings', icon: Settings, path: '/Settings' },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-18 left-4 z-40 md:hidden bg-blue-500 text-white p-2 rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-16 h-full bg-gray-800 text-white w-64 p-6 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-30`}>
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button 
                  onClick={() => navigate(item.path)} 
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
