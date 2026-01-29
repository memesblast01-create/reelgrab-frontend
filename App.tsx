import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Results } from './Results';
import { History } from './History';
import { Footer } from './Footer';
import { FAQ } from './FAQ';
import { Features } from './Features';
import { VideoMetadata, DownloadHistoryItem } from './types';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-gray-950 text-white selection:bg-cyan-500/30">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

const LandingPage: React.FC = () => {
  const [currentResult, setCurrentResult] = useState<VideoMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtractionStart = () => {
    setLoading(true);
    setError(null);
    setCurrentResult(null);
  };

  const handleExtractionSuccess = (metadata: VideoMetadata) => {
    setCurrentResult(metadata);
    setLoading(false);

    // Save to history
    const historyItem: DownloadHistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: metadata.title,
      thumbnail: metadata.thumbnail,
      platform: metadata.platform,
      timestamp: Date.now(),
      url: metadata.url,
      isFavorite: false,
    };

    const existingHistory = JSON.parse(localStorage.getItem('reelgrab_history') || '[]');
    localStorage.setItem(
      'reelgrab_history',
      JSON.stringify([historyItem, ...existingHistory].slice(0, 50))
    );
  };

  const handleExtractionError = (msg: string) => {
    setError(msg);
    setLoading(false);
  };

  return (
    <div className="space-y-20 pb-20">
      <Hero
        onStart={handleExtractionStart}
        onSuccess={handleExtractionSuccess}
        onError={handleExtractionError}
        isLoading={loading}
      />

      {loading && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 animate-pulse flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-cyan-400 font-medium">Extracting video streams from source...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl p-4 text-center">
            {error}
          </div>
        </div>
      )}

      {currentResult && !loading && (
        <section id="results" className="scroll-mt-24">
          <Results metadata={currentResult} />
        </section>
      )}

      <Features />
      <FAQ />
    </div>
  );
};

const HistoryPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Your Grab History
        </h1>
        <p className="text-gray-400 mt-2">Manage and revisit your favorite video downloads.</p>
      </div>
      <History />
    </div>
  );
};

export default App;
