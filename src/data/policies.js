// Indian Government Compliance Policies for DeepGuard+
// Based on DPDP Act 2023, IT Act 2000, and GIGW 3.0

export const privacyPolicy = {
  title: "Privacy Policy",
  lastUpdated: "August 2025",
  icon: "policy",
  sections: [
    {
      heading: "Data Fiduciary Information",
      content: "DeepGuard+ Forensic Systems operates as the Data Fiduciary under the Digital Personal Data Protection Act, 2023 (DPDP Act). Our registered office address and contact details are available upon request. For all data-related queries, contact our Grievance Officer at grievance@deepguard.in."
    },
    {
      heading: "Data We Collect",
      content: "We collect the following categories of personal data:\n• Uploaded Media Files: Images and videos uploaded for forensic analysis. These are processed in-memory and are NOT stored on our servers after analysis is complete.\n• Authentication Data: Name, email address, and profile picture obtained via Google, GitHub, or Microsoft OAuth login.\n• Usage Metadata: Browser type, IP address, timestamps of analysis sessions, and interaction logs for service improvement.\n• Analysis History: Results of forensic analyses are stored locally in your browser's localStorage and are never transmitted to our servers."
    },
    {
      heading: "Purpose Limitation (Section 4, DPDP Act)",
      content: "Your data is processed exclusively for the following lawful purposes:\n• Media Forensic Analysis: To detect manipulated, synthetic, or AI-generated media.\n• Authentication: To verify your identity and manage your session.\n• Service Improvement: Anonymized, aggregated usage statistics to improve detection algorithms.\nWe do NOT use your uploaded media to train AI models. We do NOT share, sell, or transfer your data to third parties for marketing."
    },
    {
      heading: "Consent & Withdrawal (Section 6, DPDP Act)",
      content: "By uploading media for analysis, you provide free, specific, informed, and unambiguous consent for processing. You may withdraw consent at any time by:\n• Deleting your analysis history from the dashboard.\n• Requesting account deletion by emailing grievance@deepguard.in.\n• Consent withdrawal is as easy as consent provision, as mandated by the DPDP Act."
    },
    {
      heading: "Data Principal Rights (Section 11-14, DPDP Act)",
      content: "As a Data Principal, you have the right to:\n• Access: Request a summary of all personal data we process about you.\n• Correction: Request correction of inaccurate or incomplete data.\n• Erasure: Request deletion of your data, subject to legal retention requirements.\n• Nomination: Nominate a representative to exercise your rights in case of incapacity or death.\n• Grievance Redressal: File a complaint with our Grievance Officer within 30 days of your request."
    },
    {
      heading: "Data Retention & Security",
      content: "• Uploaded media files are processed in volatile memory and deleted immediately after analysis.\n• Analysis results are stored only in your browser's local storage.\n• Authentication tokens expire after 24 hours of inactivity.\n• We implement AES-256 encryption for data in transit (TLS 1.3) and at rest.\n• We comply with CERT-In advisories and conduct regular security audits."
    },
    {
      heading: "Breach Notification",
      content: "In the event of a data breach affecting your personal data, we will notify the Data Protection Board of India and affected users within 72 hours, as mandated by the DPDP Act and CERT-In guidelines."
    }
  ]
};

export const termsOfService = {
  title: "Terms of Service",
  lastUpdated: "August 2025",
  icon: "gavel",
  sections: [
    {
      heading: "Acceptance of Terms",
      content: "By accessing or using DeepGuard+ (the 'Service'), you agree to be bound by these Terms of Service. If you do not agree, you must not access or use the Service. These terms are governed by the Information Technology Act, 2000 and the laws of India."
    },
    {
      heading: "Service Description",
      content: "DeepGuard+ provides AI-assisted forensic analysis of digital media to detect potential manipulation, synthetic generation, or deepfake artifacts. The Service uses Google Gemini AI and proprietary algorithms to generate probabilistic assessments."
    },
    {
      heading: "Limitation of Liability",
      content: "IMPORTANT: DeepGuard+ provides AI-assisted probability analysis, NOT definitive legal or forensic proof. Our analysis results are advisory in nature and should not be used as the sole basis for legal, journalistic, or law enforcement decisions. We expressly disclaim liability for:\n• Decisions made based solely on our analysis results.\n• False positives or false negatives in detection.\n• Any damages arising from reliance on our forensic assessments.\nFor legally admissible forensic evidence, consult a certified digital forensics professional."
    },
    {
      heading: "Prohibited Use",
      content: "Users are strictly prohibited from:\n• Uploading illegal content, including CSAM (Child Sexual Abuse Material), as defined under Section 67B of the IT Act, 2000.\n• Using the Service to harass, defame, or invade the privacy of individuals.\n• Uploading content that violates the Indian Penal Code or any applicable laws.\n• Attempting to reverse-engineer, decompile, or extract our detection algorithms.\n• Using automated bots or scripts to access the Service without authorization."
    },
    {
      heading: "Intellectual Property",
      content: "• You retain full copyright and ownership of your uploaded media files.\n• DeepGuard+ retains intellectual property rights over generated Trust Certificates, DNA Fingerprints, Provenance Chains, and forensic analysis reports.\n• The DeepGuard+ name, logo, and brand assets are protected trademarks."
    },
    {
      heading: "Governing Law & Jurisdiction",
      content: "These Terms are governed by the laws of the Republic of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India."
    }
  ]
};

export const securityCompliance = {
  title: "Security & Compliance",
  lastUpdated: "August 2025",
  icon: "shield",
  sections: [
    {
      heading: "Regulatory Compliance",
      content: "DeepGuard+ is designed to comply with:\n• Digital Personal Data Protection Act, 2023 (DPDP Act)\n• Digital Personal Data Protection Rules, 2025\n• Information Technology Act, 2000 and IT (Intermediary Guidelines) Rules\n• CERT-In Cybersecurity Directives\n• Guidelines for Indian Government Websites (GIGW 3.0) principles"
    },
    {
      heading: "Data Processing Architecture",
      content: "• Client-Side Processing: All media analysis occurs through secure API calls. No media files are permanently stored on our infrastructure.\n• Zero-Retention Policy: Uploaded files exist only in volatile memory during the analysis window (typically 5-15 seconds) and are immediately purged.\n• Local Storage Only: Analysis history and results are stored exclusively in the user's browser localStorage, never on our servers."
    },
    {
      heading: "Encryption & Transport Security",
      content: "• All data in transit is protected by TLS 1.3 encryption.\n• API keys are stored as environment variables, never in client-side code.\n• OAuth tokens are handled through industry-standard Firebase Authentication."
    },
    {
      heading: "Content Moderation & Takedown",
      content: "In compliance with the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021:\n• We provide a mechanism for content takedown requests.\n• We cooperate with Indian law enforcement agencies when presented with valid legal warrants.\n• We maintain logs as required by CERT-In for a period of 180 days.\n• To report content or request takedown, email: compliance@deepguard.in"
    },
    {
      heading: "Accessibility (GIGW 3.0)",
      content: "DeepGuard+ is committed to ensuring digital accessibility for people with disabilities, in alignment with GIGW 3.0 and WCAG 2.1 Level AA standards. We employ:\n• Semantic HTML5 markup\n• ARIA labels for interactive elements\n• Keyboard navigation support\n• Sufficient color contrast ratios\n• Screen reader compatibility"
    },
    {
      heading: "Incident Response",
      content: "Our incident response protocol follows CERT-In guidelines:\n• Detection & Containment: Automated monitoring detects anomalies within minutes.\n• Notification: Data Protection Board of India and affected users notified within 72 hours.\n• Investigation: Root cause analysis conducted within 7 days.\n• Remediation: Patches deployed within 24 hours of vulnerability confirmation."
    }
  ]
};

export const allPolicies = [privacyPolicy, termsOfService, securityCompliance];
