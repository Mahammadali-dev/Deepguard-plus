import React from 'react';

const ProvenanceChain = ({ chain }) => {
  return (
    <div className="bg-surface border border-outline rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6 text-on-surface">
        <span className="material-symbols-outlined">account_tree</span>
        <h3 className="text-title-lg font-semibold">Provenance Chain</h3>
      </div>
      <div className="relative border-l border-outline ml-4 space-y-6">
        {chain.map((item, index) => {
          const isAlert = item.isAlert;
          return (
            <div
              key={index}
              className="relative pl-8 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className={`absolute -left-4 top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  isAlert
                    ? 'bg-error/20 border-error text-error'
                    : 'bg-surface-container-high border-outline text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-label-md text-on-surface/60">{item.step}</span>
                  <h4 className={`text-body-lg font-medium ${isAlert ? 'text-error' : 'text-on-surface'}`}>
                    {item.action}
                  </h4>
                </div>
                <p className="text-body-sm text-on-surface/80 mt-1">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProvenanceChain;
