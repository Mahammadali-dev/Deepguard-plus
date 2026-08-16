export default function Footer({ onPrivacyClick, onTermsClick, onSecurityClick }) {
  return (
    <footer className="w-full border-t border-outline bg-surface-container-lowest mt-auto">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-inverse-primary flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">D+</span>
              </div>
              <span className="font-bold text-on-surface tracking-tight">
                DeepGuard<span className="text-primary">+</span>
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs leading-relaxed">
              AI-powered forensic analysis for detecting manipulated
              and synthetic media. Built in India, for the world.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant tracking-widest uppercase mb-3">Product</p>
              <div className="space-y-2">
                <a href="/detect" className="block font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Detect</a>
                <a href="/api" className="block font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">API</a>
                <a href="/research" className="block font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Research</a>
              </div>
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant tracking-widest uppercase mb-3">Legal</p>
              <div className="space-y-2">
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="block font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Privacy Policy</a>
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="block font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Terms of Service</a>
                <a href="/security" target="_blank" rel="noopener noreferrer" className="block font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Security</a>
              </div>
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant tracking-widest uppercase mb-3">Contact</p>
              <div className="space-y-2">
                <a href="mailto:contact@deepguard.in" className="block font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">contact@deepguard.in</a>
                <a href="/about" className="block font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">About the Team</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="border-t border-outline pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="font-label-md text-label-md text-outline-variant">
            © 2025 DeepGuard+ Forensic Systems. All rights reserved.
          </span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-primary">verified_user</span>
            <span className="font-label-md text-label-md text-outline-variant">DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
