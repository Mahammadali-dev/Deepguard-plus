import React from 'react';

const LoadingScanner = ({ progress, fileName }) => {
  const getStatusText = (prog) => {
    if (prog < 30) return 'Initializing forensic scan...';
    if (prog < 60) return 'Analyzing pixel patterns...';
    if (prog < 90) return 'Generating provenance chain...';
    return 'Compiling results...';
  };

  return (
    <div className="fixed inset-0 bg-background/90 z-[100] flex items-center justify-center backdrop-blur-sm">
      <div className="bg-surface border border-outline rounded-xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center">
        {/* Scanner Animation Container */}
        <div className="relative w-48 h-48 border-2 border-outline rounded-lg overflow-hidden mb-6 bg-background flex items-center justify-center">
           <span className="material-symbols-outlined text-6xl text-primary opacity-50">
             policy
           </span>
          {/* Scanner Line */}
          <div
            className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_10px_2px_rgba(34,197,94,0.6)] animate-scan"
            style={{
              animation: 'scan 2s linear infinite alternate'
            }}
          ></div>
        </div>
        
        {/* File Name */}
        <div className="text-on-surface font-medium mb-4 truncate w-full text-center" title={fileName}>
          {fileName || 'Unknown File'}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-background rounded-full h-2 mb-2 border border-outline overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Progress Text */}
        <div className="flex justify-between w-full text-sm text-on-surface mb-4">
          <span>{Math.round(progress)}%</span>
        </div>

        {/* Status Text */}
        <div className="text-on-surface opacity-80 text-sm animate-pulse">
          {getStatusText(progress)}
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scan {
            0% { top: 0; }
            100% { top: 100%; }
          }
        `}} />
      </div>
    </div>
  );
};

export default LoadingScanner;
