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

export default function AboutPage() {
  return (
    <main className="flex-grow">

      {/* Story */}
      <section className="w-full bg-background py-20 border-b border-outline">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          <p className="font-label-lg text-label-lg text-primary tracking-[3px] uppercase mb-6">
            Our Story
          </p>
          <h1 className="font-headline-lg text-[clamp(2rem,4vw,3rem)] leading-[1.15] font-bold text-on-surface mb-8">
            We saw the problem up close.
          </h1>
          <div className="space-y-6 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            <p>
              It started when one of us saw a deepfake video of a family member circulating
              on WhatsApp. It looked real. It sounded real. And by the time anyone could flag
              it, the damage was already done — reputation destroyed, trust broken, no recourse.
            </p>
            <p>
              That's when we realized: the tools to <em>create</em> fake media are free and
              getting better every week. But the tools to <em>detect</em> them? Either locked
              behind enterprise paywalls or too technical for anyone without a PhD in computer vision.
            </p>
            <p>
              <span className="text-on-surface font-semibold">DeepGuard+ exists to change that.</span> We're
              building forensic-grade detection that anyone can use — a journalist verifying a source,
              a bank screening KYC documents, or a parent who just needs to know if something is real.
            </p>
          </div>
        </div>
      </section>

      {/* What Drives Us */}
      <section className="w-full bg-surface-container-lowest py-20 border-b border-outline">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop">
          <RevealSection direction="blur">
            <h2 className="font-headline-md text-headline-md font-semibold text-on-surface mb-12">
              What we believe
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {[
              {
                title: "Truth shouldn\'t require expertise",
                desc: 'If a 14-year-old can make a deepfake with a free app, a 14-year-old should be able to detect one too. We refuse to hide behind complexity.',
              },
              {
                title: 'Privacy is non-negotiable',
                desc: 'Your media never touches our servers permanently. We process in memory, delete immediately, and comply with the DPDP Act 2023. No exceptions.',
              },
              {
                title: 'Speed matters more than perfection',
                desc: 'A deepfake that goes viral in 10 minutes can\'t wait for a 48-hour forensic report. Our analysis completes in under 10 seconds.',
              },
              {
                title: 'India deserves world-class tools',
                desc: 'Most deepfake detection tools are built in the US, priced in dollars, and ignore Indian regulatory needs. We\'re changing that — built here, for here.',
              },
            ].map((item, i) => (
              <RevealSection key={i} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="w-full bg-background py-20 border-b border-outline">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop">
          <RevealSection direction="blur">
            <p className="font-label-lg text-label-lg text-primary tracking-[3px] uppercase mb-4">The Team</p>
            <h2 className="font-headline-md text-headline-md font-semibold text-on-surface mb-4">
              Four people. 24 hours. One mission.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-12 max-w-lg">
              We built DeepGuard+ during a hackathon because we couldn't wait to start.
              Here's who did what.
            </p>
          </RevealSection>

          <div className="space-y-6">
            {[
              {
                initials: 'M',
                name: 'Member 1',
                role: 'AI & Backend',
                color: 'bg-inverse-primary',
                what: 'Designed the Gemini integration prompt, built the forensic analysis pipeline, and created the perceptual hashing algorithm for DNA fingerprints.',
              },
              {
                initials: 'A',
                name: 'Member 2',
                role: 'Frontend & Design',
                color: 'bg-tertiary-container',
                what: 'Architected the React component system, implemented the design tokens from scratch, and built every animation you see on this site.',
              },
              {
                initials: 'R',
                name: 'Member 3',
                role: 'Security & Compliance',
                color: 'bg-primary',
                what: 'Wrote the DPDP Act compliance framework, drafted all three policy documents, and ensured zero-retention data architecture.',
              },
              {
                initials: 'S',
                name: 'Member 4',
                role: 'Product & Research',
                color: 'bg-secondary-container',
                what: 'Conducted the deepfake threat landscape research, designed the provenance chain concept, and handled testing across 50+ media files.',
              },
            ].map((member, i) => (
              <RevealSection key={i} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className="flex gap-5 items-start p-6 bg-surface border border-outline rounded-xl hover:border-outline-variant transition-colors">
                  <div className={`w-11 h-11 rounded-lg ${member.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-sm">{member.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                      <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                        {member.name}
                      </h3>
                      <span className="font-label-md text-label-md text-primary">{member.role}</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {member.what}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <p className="font-body-sm text-body-sm text-outline-variant mt-8 italic">
            Replace "Member 1–4" with your real names before the demo.
          </p>
        </div>
      </section>

      {/* Built With */}
      <section className="w-full bg-surface-container-lowest py-16">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop">
          <RevealSection direction="scale">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-1">Built with</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">The tools behind DeepGuard+</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'React', icon: '⚛️' },
                  { name: 'Vite', icon: '⚡' },
                  { name: 'Tailwind CSS', icon: '🎨' },
                  { name: 'Gemini 2.0 Flash', icon: '🧠' },
                  { name: 'Firebase', icon: '🔥' },
                  { name: 'html2canvas', icon: '📸' },
                ].map((tool) => (
                  <span key={tool.name} className="bg-surface border border-outline rounded-lg px-4 py-2 font-label-lg text-[13px] text-on-surface-variant inline-flex items-center gap-2 hover:border-outline-variant transition-colors">
                    <span>{tool.icon}</span>{tool.name}
                  </span>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
