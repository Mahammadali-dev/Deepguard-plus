import React from 'react';

const DNAFingerprint = ({ colors, hash }) => {
  return (
    <div className="bg-surface border border-outline rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6 text-on-surface">
        <span className="material-symbols-outlined">fingerprint</span>
        <h3 className="text-title-lg font-semibold">DNA Fingerprint</h3>
      </div>
      <div className="flex justify-center mb-6">
        <div className="grid grid-cols-8 gap-[1px] bg-outline p-[1px] rounded">
          {colors.slice(0, 64).map((color, idx) => (
            <div
              key={idx}
              className="w-4 h-4 rounded-sm transition-transform hover:scale-125 cursor-pointer"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      <div className="text-center group relative">
        <p className="font-mono text-body-sm text-on-surface/70 truncate w-full cursor-help">
          {hash}
        </p>
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-surface-container-high border border-outline text-on-surface text-xs p-2 rounded -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
          {hash}
        </div>
      </div>
    </div>
  );
};

export default DNAFingerprint;
