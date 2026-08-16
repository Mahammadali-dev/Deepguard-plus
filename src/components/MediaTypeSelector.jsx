import React from 'react';

const MediaTypeSelector = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {/* Image Card */}
      <button
        onClick={() => onSelect('image')}
        className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 text-left w-full
          ${selected === 'image' 
            ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(173,198,255,0.1)]' 
            : 'border-outline bg-surface hover:border-primary/50'
          }
        `}
      >
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors
          ${selected === 'image' ? 'bg-primary text-background' : 'bg-background text-on-surface border border-outline'}
        `}>
          <span className="material-symbols-outlined text-2xl">
            image
          </span>
        </div>
        <h3 className="text-on-surface font-semibold mb-1 w-full text-center sm:text-left">Image Analysis</h3>
        <p className="text-on-surface opacity-70 text-sm w-full text-center sm:text-left">
          Analyze photos and generated imagery
        </p>
      </button>

      {/* Video Card */}
      <button
        onClick={() => onSelect('video')}
        className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 text-left w-full
          ${selected === 'video' 
            ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(173,198,255,0.1)]' 
            : 'border-outline bg-surface hover:border-primary/50'
          }
        `}
      >
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors
          ${selected === 'video' ? 'bg-primary text-background' : 'bg-background text-on-surface border border-outline'}
        `}>
          <span className="material-symbols-outlined text-2xl">
            movie
          </span>
        </div>
        <h3 className="text-on-surface font-semibold mb-1 w-full text-center sm:text-left">Video Analysis</h3>
        <p className="text-on-surface opacity-70 text-sm w-full text-center sm:text-left">
          Detect deepfakes in video frames
        </p>
      </button>
    </div>
  );
};

export default MediaTypeSelector;
