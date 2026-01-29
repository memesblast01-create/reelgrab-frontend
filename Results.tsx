
import React from 'react';
import { VideoMetadata, VideoFormat } from '../types';

interface ResultsProps {
  metadata: VideoMetadata;
}

export const Results: React.FC<ResultsProps> = ({ metadata }) => {
  const downloadFile = (format: VideoFormat) => {
    // In a real app, this would trigger a file download from the server
    // For this demo, we'll simulate the download action
    console.log(`Downloading ${format.quality} ${format.ext} from ${format.url}`);
    alert(`Starting download: ${metadata.title}\nQuality: ${format.quality}\nFormat: ${format.ext}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          
          {/* Video Preview Section */}
          <div className="lg:col-span-2 bg-gray-950 p-6 flex flex-col">
            <div className="relative aspect-video lg:aspect-[4/5] rounded-xl overflow-hidden bg-gray-900 mb-6 group">
              <img 
                src={metadata.thumbnail || 'https://picsum.photos/400/600'} 
                alt={metadata.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2 py-1 bg-black/60 text-xs font-bold rounded text-white uppercase tracking-widest backdrop-blur-sm">
                  {metadata.platform}
                </span>
                <p className="mt-2 text-sm text-gray-300 font-medium">Duration: {metadata.duration}</p>
              </div>
            </div>
            
            <div className="flex-grow">
              <h2 className="text-xl font-bold line-clamp-2 leading-snug mb-2">{metadata.title}</h2>
              <p className="text-gray-500 text-sm">By {metadata.author}</p>
            </div>
          </div>

          {/* Download Options Section */}
          <div className="lg:col-span-3 p-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
              <h3 className="text-lg font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Available Qualities
              </h3>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(metadata.url);
                  alert('Original link copied to clipboard!');
                }}
                className="text-xs text-gray-400 hover:text-cyan-400 flex items-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Link
              </button>
            </div>

            <div className="space-y-4">
              {metadata.formats.map((format, idx) => (
                <div 
                  key={format.id || idx}
                  className="flex items-center justify-between p-4 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-all border border-transparent hover:border-gray-700 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${
                      format.ext === 'mp3' ? 'bg-purple-500/10 text-purple-400' : 'bg-cyan-500/10 text-cyan-400'
                    }`}>
                      {format.ext.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-100">{format.quality}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-tighter">{format.size} • {format.ext}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => downloadFile(format)}
                    className="px-6 py-2 bg-gray-900 hover:bg-cyan-500 text-cyan-400 hover:text-white rounded-xl text-sm font-bold transition-all border border-cyan-500/30 group-hover:shadow-lg active:scale-95"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800 grid grid-cols-2 gap-4">
              <div className="bg-gray-800/30 p-4 rounded-2xl border border-gray-800">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Fastest Grab</p>
                <p className="text-sm text-gray-300">Server optimized direct extraction enabled.</p>
              </div>
              <div className="bg-gray-800/30 p-4 rounded-2xl border border-gray-800">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Privacy</p>
                <p className="text-sm text-gray-300">No logs, no trackers. Your downloads are private.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-gray-500 hover:text-cyan-400 text-sm font-medium flex items-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Back to Top
        </button>
      </div>
    </div>
  );
};
