
import React, { useState } from 'react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "Is it legal to download these videos?",
      a: "Downloading videos for personal, offline viewing is generally acceptable. However, you should never redistribute copyrighted content without permission. Always respect creator rights."
    },
    {
      q: "Do I need to install any software?",
      a: "No! ReelGrab Pro is a 100% web-based tool. It works directly in your browser on desktop, tablet, and mobile devices."
    },
    {
      q: "How many videos can I download per day?",
      a: "Currently, we offer unlimited downloads for all users. No registration required."
    },
    {
      q: "What video quality can I expect?",
      a: "We always try to provide the highest available source quality, ranging from 720p to 4K depending on the platform and original upload."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-extrabold text-center mb-12">Frequently Asked <span className="text-cyan-400">Questions</span></h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group bg-gray-900/30 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 open:border-cyan-500/30">
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-gray-200 hover:text-cyan-400 transition-colors">
              {faq.q}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};
