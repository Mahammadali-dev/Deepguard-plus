import React from 'react';

const VerdictBadge = ({ verdict, confidence, riskLevel }) => {
  const isManipulated = verdict === 'MANIPULATED' || verdict === 'AI_GENERATED';
  const borderColor = isManipulated ? 'border-error' : 'border-green-500';
  const textColor = isManipulated ? 'text-error' : 'text-green-500';
  const icon = isManipulated ? 'warning' : 'check_circle';
  const isHighRisk = riskLevel === 'HIGH' || riskLevel === 'CRITICAL';

  return (
    <div className={`bg-surface border-2 ${borderColor} rounded-lg p-6 flex flex-col items-center justify-center text-center ${isHighRisk ? 'animate-pulse' : ''}`}>
      <span className={`material-symbols-outlined text-6xl ${textColor} mb-4`}>
        {icon}
      </span>
      <h2 className={`text-label-lg uppercase tracking-widest ${textColor} font-bold mb-2`}>
        {verdict.replace('_', ' ')}
      </h2>
      <p className="text-on-surface text-body-md opacity-80">
        Confidence: {confidence}%
      </p>
    </div>
  );
};

export default VerdictBadge;
