import React from 'react';

const TrustBadge = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 shadow-sm"
    >
      <span className="material-symbols-outlined text-primary text-xl">
        verified_user
      </span>
      <span className="text-on-surface text-sm font-medium tracking-wide">
        Trust Center & DPDP Compliant
      </span>
    </button>
  );
};

export default TrustBadge;
