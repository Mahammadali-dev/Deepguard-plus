import React from 'react';

const HeatmapOverlay = ({ imageSrc, regions }) => {
  const gradientStyles = regions.map((region) => {
    return `radial-gradient(circle at ${region.x}% ${region.y}%, rgba(255,59,48,${region.intensity}) 0%, rgba(255,59,48,0) ${region.radius}%)`;
  }).join(', ');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative border border-outline rounded-lg overflow-hidden group">
        <div className="absolute top-2 left-2 z-10 bg-surface/80 backdrop-blur text-on-surface text-label-sm px-2 py-1 rounded">
          Original Media
        </div>
        <div className="overflow-hidden w-full h-64">
          <img
            src={imageSrc}
            alt="Original"
            className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="relative border border-outline rounded-lg overflow-hidden">
        <div className="absolute top-2 left-2 z-10 bg-surface/80 backdrop-blur text-on-surface text-label-sm px-2 py-1 rounded">
          AI Forensic Heatmap
        </div>
        <div className="w-full h-64 relative">
          <img
            src={imageSrc}
            alt="Base"
            className="w-full h-full object-cover absolute inset-0 opacity-50"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-30" />
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{ backgroundImage: gradientStyles }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeatmapOverlay;
