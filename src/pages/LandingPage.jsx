import { Link } from 'react-router-dom';
import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal';

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

function AnimatedStat({ number, suffix, label }) {
  const { ref, isVisible } = useScrollReveal();
  const count = useCountUp(number, 2200, true, isVisible);
  return (
    <span ref={ref} className="inline">
      <span className="font-headline-lg text-[56px] md:text-[72px] font-bold text-on-surface leading-none tracking-tight">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="block font-body-sm text-body-sm text-on-surface-variant mt-2">{label}</span>
    </span>
  );
}

export default function LandingPage({ onGetStarted, isAuthenticated }) {
  return (
    <main className="flex-grow flex flex-col">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-end pb-24 overflow-hidden w-full">
        {/* Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=90&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80 to-background/40 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-3xl">
            <p
              className="font-label-lg text-label-lg text-primary tracking-[3px] uppercase mb-6 animate-fade-in-up"
            >
              AI Forensic Platform
            </p>
            <h1 className="font-headline-lg text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-bold text-on-surface mb-8 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              Don't trust what
              <br />
              you <span className="font-headline-lg italic text-primary">see.</span>
              <br />
              <span className="text-on-surface-variant">Verify it.</span>
            </h1>
            <p
              className="font-body-lg text-[18px] text-on-surface-variant max-w-lg mb-10 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              DeepGuard+ detects manipulated and AI-generated media
              with forensic-grade precision — before it causes damage.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
              <button
                onClick={onGetStarted}
                className="btn-glow bg-inverse-primary text-white font-label-lg text-label-lg px-8 py-3.5 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 inline-flex items-center gap-2 active:scale-95"
              >
                Start Analysis
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <Link
                to="/research"
                className="border border-outline text-on-surface-variant font-label-lg text-label-lg px-8 py-3.5 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-all duration-300 active:scale-95"
              >
                Read the Research
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="w-full border-y border-outline bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-5 flex flex-wrap items-center justify-between gap-4">
          <span className="font-label-md text-label-md text-on-surface-variant tracking-widest uppercase">Trusted by enterprises</span>
          <div className="flex flex-wrap items-center gap-6">
            {['DPDP Act 2023 Compliant', 'CERT-In Certified', 'GIGW 3.0 Aligned', 'ISO 27001'].map((badge) => (
              <span key={badge} className="font-label-md text-label-md text-outline-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM (Editorial Stats) ─── */}
      <section className="w-full bg-background py-28 border-b border-outline">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <RevealSection direction="blur">
            <p className="font-label-lg text-label-lg text-primary tracking-[3px] uppercase mb-4">The Threat</p>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-6 max-w-2xl">
              Deepfakes are no longer<br />a novelty — they're a weapon.
            </h2>
            <div className="w-16 h-[2px] bg-primary mb-12" />
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <RevealSection>
              <AnimatedStat number={3000} suffix="%" label="Increase in deepfake fraud since 2022 — Sumsub Report" />
            </RevealSection>
            <RevealSection>
              <AnimatedStat number={500} suffix="K+" label="Synthetic videos circulating online — World Economic Forum" />
            </RevealSection>
            <RevealSection>
              <AnimatedStat number={71} suffix="%" label="Of people cannot distinguish real from fake — iProov" />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DO (Asymmetric Feature Layout) ─── */}
      <section className="w-full bg-surface-container-lowest py-28 border-b border-outline">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <RevealSection direction="blur">
            <p className="font-label-lg text-label-lg text-primary tracking-[3px] uppercase mb-4">Capabilities</p>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-16 max-w-xl">
              Six layers of forensic intelligence.
            </h2>
          </RevealSection>

          {/* Feature 1 — Wide with visual */}
          <RevealSection direction="left" className="mb-6">
            <div className="bg-surface border border-outline rounded-xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start hover:border-outline-variant transition-colors duration-500">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-inverse-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-inverse-primary text-[22px]">visibility</span>
                  </div>
                  <span className="font-label-lg text-label-lg text-on-surface-variant tracking-widest uppercase">Detection Engine</span>
                </div>
                <h3 className="font-headline-md text-headline-md font-semibold text-on-surface mb-4">
                  Multi-vector pixel analysis
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                  Our engine scans six independent detection vectors simultaneously — face manipulation,
                  synthetic textures, lighting inconsistencies, compression artifacts, metadata anomalies,
                  and edge blending. Each vector returns a confidence score that feeds into the final verdict.
                </p>
                <Link to="/api" className="text-primary font-label-lg text-label-lg hover:underline inline-flex items-center gap-1 group/l">
                  Technical documentation
                  <span className="material-symbols-outlined text-[16px] group-hover/l:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
          </RevealSection>

          {/* Feature 2 & 3 — Two cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <RevealSection direction="left">
              <div className="h-full bg-surface border border-outline rounded-xl p-8 hover:border-outline-variant transition-colors duration-500">
                <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-tertiary text-[22px]">account_tree</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-3">
                  See the full history
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
                  We don't just tell you if an image is fake — we show you how it was made. 
                  Our engine reconstructs the entire digital history, tracking every edit from 
                  the original camera capture to the final export.
                </p>
                <div className="flex items-center gap-2 text-tertiary">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                  <span className="font-label-md text-label-md">Unique to DeepGuard+</span>
                </div>
              </div>
            </RevealSection>

            <RevealSection direction="right">
              <div className="h-full bg-surface border border-outline rounded-xl p-8 hover:border-outline-variant transition-colors duration-500">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-primary text-[22px]">fingerprint</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-3">
                  DNA Fingerprint
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
                  Generates a unique 64-bit perceptual hash visualized as an 8×8 color grid.
                  Like a cryptographic signature that's instantly recognizable at a glance.
                </p>
                <div className="flex gap-[2px]">
                  {['#adc6ff','#FF3B30','#ffb595','#4b8eff','#005bc1','#cdc5c1','#ef6719','#414755'].map((c,i) => (
                    <div key={i} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>

          {/* Feature 4 — Full width, different style */}
          <RevealSection direction="scale">
            <div className="bg-surface border border-outline rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-start justify-between gap-10 hover:border-outline-variant transition-colors duration-500">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-inverse-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-inverse-primary text-[22px]">hub</span>
                  </div>
                  <span className="font-label-lg text-label-lg text-on-surface-variant tracking-widest uppercase">For Your Platform</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-3">
                  Already have a product? We plug right in.
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Whether you run a newsroom, a banking portal, or a social platform —
                  DeepGuard+ works behind the scenes. Your users upload content,
                  we scan it instantly, you get a clear answer. No AI knowledge needed on your end.
                </p>
              </div>
              <div className="flex-shrink-0 space-y-4 w-full md:w-auto">
                {[
                  { icon: 'bolt', text: 'Results in seconds' },
                  { icon: 'lock', text: 'Your data is never stored' },
                  { icon: 'support_agent', text: 'We help you set it up' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px]">{item.icon}</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── HOW IT WORKS (Numbered Steps — not cards) ─── */}
      <section className="w-full bg-background py-28 border-b border-outline">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop">
          <RevealSection direction="blur">
            <p className="font-label-lg text-label-lg text-primary tracking-[3px] uppercase mb-4">Process</p>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-16 max-w-lg">
              Three steps. Zero ambiguity.
            </h2>
          </RevealSection>

          <div className="space-y-16">
            {[
              {
                num: '01',
                title: 'Upload your media',
                desc: 'Drag and drop any image or video. We accept JPG, PNG, WEBP, MP4, MOV — up to 300MB. Your file never leaves the analysis pipeline.',
                icon: 'cloud_upload',
              },
              {
                num: '02',
                title: 'AI forensic scan',
                desc: 'Gemini 2.0 Flash Vision analyzes pixel patterns, facial landmarks, lighting physics, and compression signatures across six detection vectors simultaneously.',
                icon: 'troubleshoot',
              },
              {
                num: '03',
                title: 'Trust certificate issued',
                desc: 'Receive a detailed forensic report with provenance chain, DNA fingerprint, risk assessment, and a downloadable Trust Certificate — DPDP Act compliant.',
                icon: 'verified_user',
              },
            ].map((step, i) => (
              <RevealSection key={step.num} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className="flex gap-8 items-start">
                  <div className="hidden md:flex flex-col items-center flex-shrink-0">
                    <span className="font-headline-lg text-[48px] font-bold text-outline-variant/30 leading-none">{step.num}</span>
                    {i < 2 && <div className="w-[1px] h-16 bg-outline mt-4" />}
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-outline flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-[24px]">{step.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2">{step.title}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-lg">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA (Editorial Pull Quote) ─── */}
      {!isAuthenticated && (
        <section className="w-full bg-surface py-28">
          <RevealSection direction="scale">
            <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
              <div className="w-12 h-12 rounded-xl bg-inverse-primary/10 flex items-center justify-center mx-auto mb-8">
                <span className="material-symbols-outlined text-inverse-primary text-[24px]">shield</span>
              </div>
              <blockquote className="font-headline-lg text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.3] font-bold text-on-surface mb-8">
                "In a world where seeing is no longer believing,
                <span className="text-primary"> verification is the new trust."</span>
              </blockquote>
              <p className="font-body-md text-body-md text-on-surface-variant mb-10">
                — The DeepGuard+ Manifesto
              </p>
              <button
                onClick={onGetStarted}
                className="btn-glow bg-inverse-primary text-white font-label-lg text-label-lg px-10 py-4 rounded-lg inline-flex items-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                Begin Verification
              </button>
            </div>
          </RevealSection>
        </section>
      )}
    </main>
  );
}
