import { Category } from "../types/helpCenter";

export const CATEGORIES: Category[] = [
  {
    slug: "getting-started-npi",
    title: "Getting Started & NPI",
    shortTitle: "Getting Started",
    description: "Essential provider credentialing setup, NPI Type 1 vs Type 2 rules, and onboarding checklists.",
    iconName: "Compass",
    articleCount: 14,
  },
  {
    slug: "caqh-identity",
    title: "CAQH & Identity Verification",
    shortTitle: "CAQH & Identity",
    description: "CAQH ProView authorization, profile completion, 120-day attestations, and CVO access.",
    iconName: "ShieldCheck",
    articleCount: 12,
  },
  {
    slug: "licenses-certifications",
    title: "Licenses, Malpractice & Certifications",
    shortTitle: "Licenses & Credentials",
    description: "State medical licenses, primary source verifications, malpractice COI requirements, and board certs.",
    iconName: "Award",
    articleCount: 28,
  },
  {
    slug: "health-plans-payers",
    title: "Health Plans & Payer Enrollment",
    shortTitle: "Payers & Insurance",
    description: "Payer enrollment guides for BCBS, Aetna, Cigna, Medicare, Centene, Molina, and fee schedules.",
    iconName: "Building2",
    articleCount: 35,
  },
  {
    slug: "practice-compliance",
    title: "Practice Information & Compliance",
    shortTitle: "Practice & Compliance",
    description: "Practice locations, W-9 and tax IDs, supervisory billing, CVO delegated credentialing, and audits.",
    iconName: "FileCheck2",
    articleCount: 19,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
