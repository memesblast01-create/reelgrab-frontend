
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">ReelGrab <span className="text-cyan-400">Pro</span></span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            The world's fastest and most reliable social media video downloader. Free forever.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-400">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-cyan-400 transition-colors">Downloader</Link></li>
            <li><Link to="/history" className="hover:text-cyan-400 transition-colors">History</Link></li>
            <li><a href="#features" className="hover:text-cyan-400 transition-colors">Features</a></li>
            <li><a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-400">Platforms</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><span className="hover:text-cyan-400 transition-colors cursor-default">YouTube Downloader</span></li>
            <li><span className="hover:text-cyan-400 transition-colors cursor-default">TikTok Downloader</span></li>
            <li><span className="hover:text-cyan-400 transition-colors cursor-default">Instagram Downloader</span></li>
            <li><span className="hover:text-cyan-400 transition-colors cursor-default">Twitter/X Downloader</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-400">Legal</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><span className="hover:text-cyan-400 transition-colors cursor-default">Privacy Policy</span></li>
            <li><span className="hover:text-cyan-400 transition-colors cursor-default">Terms of Service</span></li>
            <li><span className="hover:text-cyan-400 transition-colors cursor-default">Contact Us</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs">
        <p>© 2024 ReelGrab Pro. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <span>Made with ❤️ for the video community.</span>
        </div>
      </div>
    </footer>
  );
};
