export type CategorySlug =
  | "getting-started-npi"
  | "caqh-identity"
  | "licenses-certifications"
  | "health-plans-payers"
  | "practice-compliance";

export interface Category {
  slug: CategorySlug;
  title: string;
  shortTitle?: string;
  description: string;
  iconName: string;
  articleCount?: number;
}

export interface Section {
  slug: string;
  title: string;
  category: CategorySlug;
  description?: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface Article {
  slug: string;
  title: string;
  category: CategorySlug;
  section: string;
  summary: string;
  readTime: string;
  lastUpdated: string;
  searchKeywords?: string[];
  content: string; // Markdown / HTML
  toc?: TocItem[];
  relatedSlugs?: string[];
  formStepTarget?: string; // Optional mapping to MantraComply wizard form
}
