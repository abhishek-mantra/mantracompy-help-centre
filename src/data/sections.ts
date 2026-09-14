import { Section } from "../types/helpCenter";

export const SECTIONS: Section[] = [
  // Getting Started & NPI
  {
    slug: "platform-tutorials",
    title: "MantraComply Platform & App Tutorials",
    category: "getting-started-npi",
    description: "Step-by-step guides for the 12-step Credentialing Wizard, Tasks, and Active Insurance.",
  },
  {
    slug: "npi-requirements",
    title: "NPI & Identifier Fundamentals",
    category: "getting-started-npi",
    description: "Type 1 individual vs Type 2 organizational NPIs and NPPES registry setup.",
  },
  {
    slug: "onboarding-process",
    title: "Onboarding & Credentialing Timeline",
    category: "getting-started-npi",
    description: "Understanding application steps, timelines, and how to fast-track your file.",
  },
  {
    slug: "provider-eligibility",
    title: "Specialty Credentialing Guides",
    category: "getting-started-npi",
    description: "Guides for therapists, psychiatrists, nurse practitioners, and allied health providers.",
  },

  // CAQH & Identity
  {
    slug: "caqh-proview",
    title: "CAQH ProView Setup & Profile Completion",
    category: "caqh-identity",
    description: "Step-by-step CAQH completion, 120-day re-attestation, and avoiding common delays.",
  },
  {
    slug: "caqh-authorization",
    title: "CVO Authorization & Plan Access",
    category: "caqh-identity",
    description: "Authorizing MantraComply in CAQH so health plans can access your verified credentials.",
  },
  {
    slug: "identity-verification",
    title: "Primary Identity & Legal Name Requirements",
    category: "caqh-identity",
    description: "SSN, legal entity verifications, and OIG/SAM exclusion checks.",
  },

  // Licenses, Malpractice & Certifications
  {
    slug: "state-licenses",
    title: "State Medical Licenses & Primary Source Verification",
    category: "licenses-certifications",
    description: "Verification requirements, multi-state licensing, PSYPACT, and compact rules.",
  },
  {
    slug: "malpractice-insurance",
    title: "Malpractice Insurance & Certificate of Insurance (COI)",
    category: "licenses-certifications",
    description: "Required coverage limits ($1M/$3M), active declarations pages, and tail coverage.",
  },
  {
    slug: "board-certification",
    title: "Board Certifications & Specialty Status",
    category: "licenses-certifications",
    description: "ABMS, specialty boards, and eligibility standards for commercial payer networks.",
  },
  {
    slug: "education-training",
    title: "Education, Residencies & Work History Gaps",
    category: "licenses-certifications",
    description: "Medical degree documentation, internship/residency verification, and explaining CV gaps.",
  },

  // Health Plans & Payers
  {
    slug: "commercial-payers",
    title: "Major Commercial Payers (Aetna, BCBS, Cigna, UHC)",
    category: "health-plans-payers",
    description: "Network participation criteria, enrollment applications, and contracting timelines.",
  },
  {
    slug: "government-payers",
    title: "Medicare & Medicaid Provider Enrollment",
    category: "health-plans-payers",
    description: "PECOS registration, CMS-855I forms, Medicare Advantage, and state Medicaid rosters.",
  },
  {
    slug: "specialty-payers",
    title: "Regional & Behavioral Health Networks",
    category: "health-plans-payers",
    description: "Centene, Molina, Humana, Kaiser Permanente, and specialized mental health panels.",
  },

  // Practice Compliance & FAQs
  {
    slug: "practice-details",
    title: "Practice Locations, W-9 & Tax ID (TIN)",
    category: "practice-compliance",
    description: "Matching W-9 legal names with IRS records, physical vs telehealth service locations.",
  },
  {
    slug: "supervisory-billing",
    title: "Supervisory Billing & Associate Clinicians",
    category: "practice-compliance",
    description: "Rules for pre-licensed clinicians, supervisor oversight, and incident-to billing.",
  },
  {
    slug: "cvo-automation",
    title: "Delegated Credentialing & CVO Standards",
    category: "practice-compliance",
    description: "How CVO verification accelerates payer approvals and reduces administrative burden.",
  },
  {
    slug: "audits-attestations",
    title: "Attestations, Release Forms & Background Checks",
    category: "practice-compliance",
    description: "Understanding legal authorizations, consent forms, and audit preparedness.",
  },
];

export function getSectionsByCategory(categorySlug: string): Section[] {
  return SECTIONS.filter((s) => s.category === categorySlug);
}

export function getSectionBySlug(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}
