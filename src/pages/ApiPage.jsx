import { useScrollReveal } from '../hooks/useScrollReveal';

function RevealSection({ children, className = '', direction = 'up' }) {
  const { ref, isVisible } = useScrollReveal();
  const dirClass = direction === 'left' ? 'from-left' :
                   direction === 'right' ? 'from-right' :
                   direction === 'scale' ? 'from-scale' :
                   direction === 'blur' ? 'from-blur' : '';
  return (
    <div ref={ref} className={`scroll-hidden ${dirClass} ${isVisible ? 'scroll-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

export default function ApiPage() {
  return (
    <main className="flex-grow">
      {/* Hero */}
      <section className="w-full bg-background py-20 border-b border-outline">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop">
          <p className="font-label-lg text-label-lg text-primary tracking-[3px] uppercase mb-4">
            For Developers & Enterprises
          </p>
          <h1 className="font-headline-lg text-[clamp(2rem,4vw,3rem)] leading-[1.15] font-bold text-on-surface mb-6 max-w-2xl">
            Plug deepfake detection into anything you build.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed mb-8">
            One API call. That's all it takes to verify whether an image or video
            is real, manipulated, or AI-generated. No ML expertise required.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:api@deepguard.in" className="bg-inverse-primary text-white font-label-lg text-label-lg px-6 py-3 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Request API Access
            </a>
            <a href="#how-it-works" className="border border-outline text-on-surface-variant font-label-lg text-label-lg px-6 py-3 rounded-lg hover:bg-surface-variant transition-colors">
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="w-full bg-surface-container-lowest py-20 border-b border-outline">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop">
          <RevealSection direction="blur">
            <h2 className="font-headline-md text-headline-md font-semibold text-on-surface mb-12">
              Built for teams that can't afford to get it wrong.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'newspaper',
                title: 'Newsrooms',
                desc: 'Verify user-submitted photos and videos before publishing. One wrong deepfake ruins credibility forever.',
              },
              {
                icon: 'account_balance',
                title: 'Financial Institutions',
                desc: 'Detect synthetic identity fraud in KYC documents, video calls, and submitted proof-of-identity media.',
              },
              {
                icon: 'gavel',
                title: 'Legal & Law Enforcement',
                desc: 'Authenticate digital evidence before it enters proceedings. Generate court-admissible forensic reports.',
              },
            ].map((item) => (
              <RevealSection key={item.title}>
                <div className="h-full">
                  <div className="w-10 h-10 rounded-lg bg-surface border border-outline flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary text-[22px]">{item.icon}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2">{item.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — Visual Flow */}
      <section id="how-it-works" className="w-full bg-background py-20 border-b border-outline">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop">
          <RevealSection direction="blur">
            <p className="font-label-lg text-label-lg text-primary tracking-[3px] uppercase mb-4">Integration</p>
            <h2 className="font-headline-md text-headline-md font-semibold text-on-surface mb-12">
              How it works in your pipeline
            </h2>
          </RevealSection>

          <RevealSection direction="scale">
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              {[
                { step: '1', icon: 'upload_file', title: 'Send media', desc: 'POST your image or video to our endpoint' },
                { step: '2', icon: 'psychology', title: 'AI analyzes', desc: 'Gemini 2.0 Flash runs 6-vector forensic scan' },
                { step: '3', icon: 'fact_check', title: 'Get verdict', desc: 'Receive structured JSON with verdict + confidence' },
              ].map((s, i) => (
                <div key={s.step} className="flex-1 flex items-center gap-4">
                  <div className="flex-1 bg-surface border border-outline rounded-xl p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-inverse-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-inverse-primary text-[24px]">{s.icon}</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-1">{s.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{s.desc}</p>
                  </div>
                  {i < 2 && (
                    <span className="material-symbols-outlined text-outline-variant text-[20px] hidden md:block flex-shrink-0">
                      arrow_forward
                    </span>
                  )}
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* What You Get Back */}
      <section className="w-full bg-surface-container-lowest py-20 border-b border-outline">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop">
          <RevealSection direction="blur">
            <h2 className="font-headline-md text-headline-md font-semibold text-on-surface mb-4">
              What you get back
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-12 max-w-lg">
              Every API response includes a complete forensic breakdown — not just a yes/no answer.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: 'verified', label: 'Verdict', desc: 'AUTHENTIC, MANIPULATED, or AI_GENERATED' },
              { icon: 'speed', label: 'Confidence Score', desc: '0–100% certainty of the assessment' },
              { icon: 'warning', label: 'Risk Level', desc: 'LOW, MEDIUM, HIGH, or CRITICAL' },
              { icon: 'account_tree', label: 'Provenance Chain', desc: 'Full edit history reconstruction' },
              { icon: 'fingerprint', label: 'DNA Fingerprint', desc: '64-bit perceptual hash of the media' },
              { icon: 'search', label: 'Detailed Findings', desc: 'Region-specific anomaly descriptions' },
            ].map((item) => (
              <RevealSection key={item.label}>
                <div className="flex items-start gap-3 p-4 bg-surface border border-outline rounded-lg hover:border-outline-variant transition-colors">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-label-lg text-label-lg text-on-surface mb-0.5">{item.label}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{item.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="w-full bg-background py-20 border-b border-outline">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '<1s', label: 'Average latency' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '50MB', label: 'Max image size' },
              { value: '300MB', label: 'Max video size' },
            ].map((s) => (
              <RevealSection key={s.label} direction="scale">
                <div>
                  <p className="font-headline-md text-headline-md font-bold text-on-surface mb-1">{s.value}</p>
                  <p className="font-label-md text-label-md text-on-surface-variant">{s.label}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="w-full bg-surface-container-lowest py-20 border-b border-outline">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop">
          <RevealSection direction="blur">
            <h2 className="font-headline-md text-headline-md font-semibold text-on-surface mb-12">
              Simple, transparent pricing
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <RevealSection direction="left">
              <div className="bg-surface border border-outline rounded-xl p-8">
                <p className="font-label-lg text-label-lg text-on-surface-variant tracking-widest uppercase mb-2">Free</p>
                <p className="font-headline-lg text-[36px] font-bold text-on-surface mb-1">₹0</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">Perfect for testing & evaluation</p>
                <ul className="space-y-3">
                  {['50 requests / day', 'Image analysis only', 'Standard response time', 'Community support'].map((f) => (
                    <li key={f} className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px] text-primary">check</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>

            <RevealSection direction="right">
              <div className="bg-surface border-2 border-primary rounded-xl p-8 relative">
                <div className="absolute -top-3 left-6 bg-primary text-on-primary-container font-label-md text-label-md px-3 py-0.5 rounded-full">
                  Recommended
                </div>
                <p className="font-label-lg text-label-lg text-primary tracking-widest uppercase mb-2">Enterprise</p>
                <p className="font-headline-lg text-[36px] font-bold text-on-surface mb-1">Custom</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">For production workloads</p>
                <ul className="space-y-3">
                  {['Unlimited requests', 'Image + Video analysis', 'Priority sub-second latency', 'Dedicated support + SLA', 'On-premise deployment option', 'Custom webhook integrations'].map((f) => (
                    <li key={f} className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px] text-primary">check</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-background py-20">
        <RevealSection direction="scale">
          <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <h2 className="font-headline-md text-headline-md font-semibold text-on-surface mb-4">
              Ready to integrate?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              Get your API key and start detecting deepfakes in under 5 minutes.
              Our team will help you with onboarding.
            </p>
            <a
              href="mailto:api@deepguard.in"
              className="btn-glow bg-inverse-primary text-white font-label-lg text-label-lg px-8 py-3.5 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Contact for API Access
            </a>
          </div>
        </RevealSection>
      </section>
    </main>
  );
}
