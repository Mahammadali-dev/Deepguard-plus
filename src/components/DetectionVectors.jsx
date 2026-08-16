import React from 'react';

const formatLabel = (key) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const DetectionVectors = ({ vectors }) => {
  const getBarColor = (value) => {
    if (value > 80) return 'bg-error';
    if (value >= 40) return 'bg-tertiary';
    return 'bg-primary';
  };

  return (
    <div className="bg-surface border border-outline rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6 text-on-surface">
        <span className="material-symbols-outlined">analytics</span>
        <h3 className="text-title-lg font-semibold">Detection Vectors</h3>
      </div>
      <div className="space-y-4">
        {Object.entries(vectors).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-body-sm text-on-surface mb-1">
              <span>{formatLabel(key)}</span>
              <span>{value}%</span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
              <div
                className={`${getBarColor(value)} h-2 rounded-full progress-bar-fill transition-all duration-1000 ease-out`}
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetectionVectors;
