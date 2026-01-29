
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center neon-glow group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">ReelGrab <span className="text-cyan-400">Pro</span></span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-cyan-400 ${location.pathname === '/' ? 'text-cyan-400' : 'text-gray-400'}`}
            >
              Downloader
            </Link>
            <Link 
              to="/history" 
              className={`text-sm font-medium transition-colors hover:text-cyan-400 ${location.pathname === '/history' ? 'text-cyan-400' : 'text-gray-400'}`}
            >
              History
            </Link>
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors">Features</a>
          </div>

          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] active:scale-95">
            Go Premium
          </button>
        </div>
      </div>
    </nav>
  );
};
