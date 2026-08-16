import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function PolicyPage({ policy }) {
  const { ref, isVisible } = useScrollReveal();

  if (!policy) return null;

  return (
    <main className="flex-grow bg-background py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="mb-16 pb-8 border-b border-outline">
          <div className="w-16 h-16 rounded-2xl bg-surface-container-high border border-outline flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary text-[32px]">{policy.icon}</span>
          </div>
          <h1 className="font-headline-lg text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-on-surface mb-4">
            {policy.title}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">update</span>
            Last updated: {policy.lastUpdated}
          </p>
        </div>

        {/* Content Sections */}
        <div ref={ref} className={`space-y-12 scroll-hidden from-up ${isVisible ? 'scroll-visible' : ''}`}>
          {policy.sections.map((section, index) => (
            <section key={index} className="scroll-mt-24">
              <h2 className="font-headline-md text-headline-md font-semibold text-on-surface mb-6">
                {section.heading}
              </h2>
              <div className="prose prose-invert prose-p:font-body-md prose-p:text-body-md prose-p:text-on-surface-variant prose-p:leading-relaxed prose-li:text-on-surface-variant prose-li:font-body-md prose-ul:list-disc prose-ul:ml-5 max-w-none">
                {section.content.split('\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('•')) {
                    return (
                      <ul key={pIdx} className="my-2 text-on-surface-variant font-body-md leading-relaxed ml-5 list-disc">
                        <li>{paragraph.substring(1).trim()}</li>
                      </ul>
                    );
                  }
                  return (
                    <p key={pIdx} className="mb-4 text-on-surface-variant font-body-md leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
        
      </div>
    </main>
  );
}
