
import React, { useState, useEffect } from 'react';
import { DownloadHistoryItem } from '../types';

export const History: React.FC = () => {
  const [history, setHistory] = useState<DownloadHistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('reelgrab_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const updated = history.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setHistory(updated);
    localStorage.setItem('reelgrab_history', JSON.stringify(updated));
  };

  const removeItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('reelgrab_history', JSON.stringify(updated));
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to clear your entire history?')) {
      setHistory([]);
      localStorage.removeItem('reelgrab_history');
    }
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-900/20 border-2 border-dashed border-gray-800 rounded-3xl">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-400">No grabs yet</h3>
        <p className="text-gray-500 text-sm mt-1">Paste a link to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={clearAll}
          className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear All History
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item) => (
          <div key={item.id} className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden group hover:border-cyan-500/50 transition-all">
            <div className="relative aspect-video">
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 flex space-x-2">
                <span className="bg-black/70 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded text-cyan-400 uppercase">
                  {item.platform}
                </span>
              </div>
              <button 
                onClick={() => toggleFavorite(item.id)}
                className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors ${
                  item.isFavorite ? 'bg-red-500 text-white' : 'bg-black/70 text-white hover:text-red-400'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={item.isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-200 line-clamp-1 mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500 mb-4">{new Date(item.timestamp).toLocaleDateString()}</p>
              <div className="flex space-x-2">
                <button 
                  onClick={() => window.open(item.url, '_blank')}
                  className="flex-grow py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-bold transition-colors"
                >
                  View Original
                </button>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 bg-gray-800/50 hover:bg-red-500/20 text-gray-600 hover:text-red-400 rounded-lg transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
