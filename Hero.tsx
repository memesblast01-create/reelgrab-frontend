import React, { useState, useEffect } from 'react';

interface HeroProps {
  onStart: () => void;
  onSuccess: (data: VideoMetadata) => void;
  onError: (msg: string) => void;
  isLoading: boolean;
}

interface VideoMetadata {
  url: string;
  platform: string;
  title: string;
  thumbnail: string;
  duration?: number;
  author?: string;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onSuccess, onError, isLoading }) => {
  const [url, setUrl] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);

  // Detect platform from URL
  const detectPlatform = (url: string): string | null => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    if (url.includes('tiktok.com')) return 'TikTok';
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('facebook.com')) return 'Facebook';
    if (url.includes('twitter.com')) return 'Twitter';
    return null;
  };

  // Keyless metadata extraction (simulated)
  const extractVideoMetadata = async (url: string): Promise<VideoMetadata> => {
    const platform = detectPlatform(url);
    if (!platform) throw new Error('Unsupported platform');

    // Simulate metadata
    return {
      url,
      platform,
      title: `Sample Video Title for ${platform}`,
      thumbnail: 'https://via.placeholder.com/480x270.png?text=Video+Thumbnail',
      duration: 120,
      author: 'Sample Author',
    };
  };

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

      // Scroll to results section
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      onError("Unable to process this link. Please ensure it's a valid video URL.");
    }
  };

  return (
    <div className="relative pt-20 pb-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Any Video, <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Any Platform,</span> Instantly.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Download high-quality videos from YouTube, TikTok, Instagram, Twitter, and more without watermarks or limits.
        </p>

        <form onSubmit={handleSubmit} className="relative group max-w-3xl mx-auto">
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
                  <span>Download Now</span>
                </>
              )}
            </button>
          </div>

          {detectedPlatform && (
            <div className="mt-4 flex justify-center">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold rounded-full uppercase tracking-wider">
                Detected: {detectedPlatform}
              </span>
            </div>
          )}
        </form>

        <div className="mt-12 flex flex-wrap justify-center gap-6 opacity-60">
          {['YouTube', 'TikTok', 'Instagram', 'Facebook', 'Twitter'].map((name) => (
            <div key={name} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
              <span className="text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
