import React, { useState } from 'react';

const FindingsPanel = ({ findings }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getSeverityStyle = (severity) => {
    if (severity === 'CRITICAL' || severity === 'HIGH') return 'bg-error text-on-error';
    if (severity === 'MEDIUM') return 'bg-tertiary text-on-tertiary';
    return 'bg-primary text-on-primary';
  };

  return (
    <div className="bg-surface border border-outline rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6 text-on-surface">
        <span className="material-symbols-outlined">search</span>
        <h3 className="text-title-lg font-semibold">Detailed Findings</h3>
      </div>
      <div className="space-y-3">
        {findings.map((finding, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div key={index} className="border border-outline rounded-lg overflow-hidden bg-surface-container-low">
              <button
                className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-container-high transition-colors"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-label-sm px-2 py-1 rounded font-bold ${getSeverityStyle(finding.severity)}`}>
                    {finding.severity}
                  </span>
                  <span className="text-body-lg text-on-surface font-medium">{finding.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-label-sm bg-surface text-on-surface border border-outline px-2 py-1 rounded-full">
                    {finding.region}
                  </span>
                  <span className={`material-symbols-outlined text-on-surface/60 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </div>
              </button>
              {isExpanded && (
                <div className="p-4 border-t border-outline text-body-md text-on-surface/80 bg-surface">
                  {finding.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FindingsPanel;
