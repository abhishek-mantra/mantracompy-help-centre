import { Category } from "../types/helpCenter";
import { getArticlesByCategory } from "./articleRegistry";

export const CATEGORIES: Category[] = [
  {
    slug: "getting-started-npi",
    title: "Getting Started & NPI",
    shortTitle: "Getting Started",
    description: "Essential provider credentialing setup, NPI Type 1 vs Type 2 rules, and onboarding checklists.",
    iconName: "Compass",
    get articleCount() {
      return getArticlesByCategory("getting-started-npi").length;
    },
  },
  {
    slug: "caqh-identity",
    title: "CAQH & Identity Verification",
    shortTitle: "CAQH & Identity",
    description: "CAQH ProView authorization, profile completion, 120-day attestations, and CVO access.",
    iconName: "ShieldCheck",
    get articleCount() {
      return getArticlesByCategory("caqh-identity").length;
    },
  },
  {
    slug: "licenses-certifications",
    title: "Licenses, Malpractice & Certifications",
    shortTitle: "Licenses & Credentials",
    description: "State medical licenses, primary source verifications, malpractice COI requirements, and board certs.",
    iconName: "Award",
    get articleCount() {
      return getArticlesByCategory("licenses-certifications").length;
    },
  },
  {
    slug: "health-plans-payers",
    title: "Health Plans & Payer Enrollment",
    shortTitle: "Payers & Insurance",
    description: "Payer enrollment guides for BCBS, Aetna, Cigna, Medicare, Centene, Molina, and fee schedules.",
    iconName: "Building2",
    get articleCount() {
      return getArticlesByCategory("health-plans-payers").length;
    },
  },
  {
    slug: "practice-compliance",
    title: "Practice Information & Compliance",
    shortTitle: "Practice & Compliance",
    description: "Practice locations, W-9 and tax IDs, supervisory billing, CVO delegated credentialing, and audits.",
    iconName: "FileCheck2",
    get articleCount() {
      return getArticlesByCategory("practice-compliance").length;
    },
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
