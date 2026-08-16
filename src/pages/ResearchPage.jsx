import React from 'react';

const ResearchPage = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface p-8 md:p-16">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">The Deepfake Threat Landscape</h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            Understanding the scale and evolution of synthetic media threats
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stat Card 1 */}
          <div className="bg-surface border border-outline rounded-2xl p-8 flex flex-col items-center text-center space-y-4">
            <div className="text-6xl font-bold text-primary">3000%</div>
            <p className="text-lg font-medium">Increase in deepfake fraud since 2022</p>
            <p className="text-sm text-on-surface-variant">Source: Sumsub Identity Fraud Report</p>
          </div>
          
          {/* Stat Card 2 */}
          <div className="bg-surface border border-outline rounded-2xl p-8 flex flex-col items-center text-center space-y-4">
            <div className="text-6xl font-bold text-primary">500,000+</div>
            <p className="text-lg font-medium">Deepfake videos circulating online in 2024</p>
            <p className="text-sm text-on-surface-variant">Source: World Economic Forum</p>
          </div>
          
          {/* Stat Card 3 */}
          <div className="bg-surface border border-outline rounded-2xl p-8 flex flex-col items-center text-center space-y-4">
            <div className="text-6xl font-bold text-primary">71%</div>
            <p className="text-lg font-medium">Of people cannot reliably distinguish deepfakes</p>
            <p className="text-sm text-on-surface-variant">Source: iProov Biometric Report</p>
          </div>
        </div>

        {/* Our Approach Section */}
        <div className="space-y-8 pt-8 border-t border-outline">
          <h2 className="text-3xl font-bold text-center">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Approach 1 */}
            <div className="bg-surface border border-outline rounded-2xl p-8 space-y-4">
              <span className="material-symbols-outlined text-4xl text-primary">troubleshoot</span>
              <h3 className="text-xl font-semibold">Multi-Vector Forensic Analysis</h3>
              <p className="text-on-surface-variant">
                We perform comprehensive pixel-level inspection across 6 distinct detection vectors, ensuring that even the most sophisticated AI manipulations are uncovered.
              </p>
            </div>
            
            {/* Approach 2 */}
            <div className="bg-surface border border-outline rounded-2xl p-8 space-y-4">
              <span className="material-symbols-outlined text-4xl text-primary">history</span>
              <h3 className="text-xl font-semibold">Provenance Chain Technology</h3>
              <p className="text-on-surface-variant">
                Our system precisely reconstructs the edit history of any media file, identifying exactly when, where, and how synthetic alterations were introduced.
              </p>
            </div>
            
            {/* Approach 3 */}
            <div className="bg-surface border border-outline rounded-2xl p-8 space-y-4">
              <span className="material-symbols-outlined text-4xl text-primary">fingerprint</span>
              <h3 className="text-xl font-semibold">DNA Fingerprinting</h3>
              <p className="text-on-surface-variant">
                Advanced perceptual hashing creates a unique, immutable visual identity for original media, preventing unauthorized manipulation and reuse.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ResearchPage;
