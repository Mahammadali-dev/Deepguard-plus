import React from 'react';

const ActionButtons = ({ onDownloadCertificate, onFlagIsolate, dnaColors = [] }) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        onClick={onDownloadCertificate}
        className="flex items-center gap-2 bg-surface border border-outline text-on-surface px-4 py-2 rounded hover:bg-surface-variant transition-colors"
      >
        <span className="material-symbols-outlined">download</span>
        <span className="text-label-md font-medium">Download Certificate</span>
      </button>
      <button
        onClick={onFlagIsolate}
        className="flex items-center gap-2 bg-surface border border-outline text-on-surface px-4 py-2 rounded hover:bg-surface-variant transition-colors"
      >
        <span className="material-symbols-outlined">flag</span>
        <span className="text-label-md font-medium">Flag & Isolate</span>
      </button>
      
      {dnaColors && dnaColors.length > 0 && (
        <div className="ml-auto border border-outline p-1 rounded bg-surface">
          <div className="grid grid-cols-4 gap-[1px]">
            {dnaColors.slice(0, 16).map((color, idx) => (
              <div
                key={idx}
                className="w-2 h-2"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
