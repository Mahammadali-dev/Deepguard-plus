import React, { useRef } from 'react';

const PolicyModal = ({ isOpen, onClose, policy }) => {
  const modalRef = useRef(null);

  if (!isOpen || !policy) return null;

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[80vh] bg-surface border border-outline rounded-xl flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-outline shrink-0 bg-surface-container">
          <div className="flex items-center gap-4">
            {policy.icon && (
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-3xl">{policy.icon}</span>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold text-on-surface tracking-tight font-headline-sm">
                {policy.title}
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Last updated: {policy.lastUpdated}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-on-surface/10 text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="space-y-8">
            {policy.sections?.map((section, index) => (
              <section key={index} className="space-y-3">
                {section.heading && (
                  <h3 className="text-lg font-medium text-on-surface font-headline-sm">
                    {section.heading}
                  </h3>
                )}
                <div className="text-base text-on-surface-variant leading-relaxed font-body-md whitespace-pre-line">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-outline shrink-0 bg-surface-container flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-inverse-primary text-white font-medium hover:bg-inverse-primary/90 transition-colors"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
