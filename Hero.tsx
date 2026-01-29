
import React, { useState, useEffect } from 'react';
import { extractVideoMetadata, detectPlatform } from '../services/geminiService';
import { VideoMetadata, Platform } from '../types';

interface HeroProps {
  onStart: () => void;
  onSuccess: (data: VideoMetadata) => void;
  onError: (msg: string) => void;
  isLoading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onSuccess, onError, isLoading }) => {
  const [url, setUrl] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    if (url.trim()) {
      setDetectedPlatform(detectPlatform(url));
    } else {
      setDetectedPlatform(null);
    }
  }, [url]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    onStart();
    try {
      const metadata = await extractVideoMetadata(url);
      onSuccess(metadata);
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      onError("Unable to process this link. Please ensure it's a valid public video URL.");
    }
  };

  return (
    <div className="relative pt-20 pb-16 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Any Video, <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Any Platform,</span> Instantly.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Download high-quality videos from YouTube, TikTok, Instagram, Twitter, and more without watermarks or limits.
        </p>

        <form onSubmit={handleSubmit} className="relative group max-w-3xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-focus-within:opacity-60 transition duration-500"></div>
          <div className="relative flex flex-col md:flex-row items-stretch bg-gray-900 border border-gray-800 rounded-2xl p-2 shadow-2xl">
            <input
              type="text"
              placeholder="Paste video link here (YouTube, TikTok, Instagram...)"
              className="flex-grow bg-transparent border-none focus:ring-0 text-white px-6 py-4 text-lg placeholder-gray-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className={`md:ml-2 px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
                isLoading 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg active:scale-95'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Now</span>
                </>
              )}
            </button>
          </div>
          
          {detectedPlatform && (
            <div className="mt-4 flex justify-center animate-in fade-in slide-in-from-top-2">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold rounded-full uppercase tracking-wider">
                Detected: {detectedPlatform}
              </span>
            </div>
          )}
        </form>

        <div className="mt-12 flex flex-wrap justify-center gap-6 opacity-60">
          <PlatformIcon name="YouTube" />
          <PlatformIcon name="TikTok" />
          <PlatformIcon name="Instagram" />
          <PlatformIcon name="Facebook" />
          <PlatformIcon name="Twitter" />
        </div>
      </div>
    </div>
  );
};

const PlatformIcon: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity cursor-default">
    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
    <span className="text-sm font-medium">{name}</span>
  </div>
);
