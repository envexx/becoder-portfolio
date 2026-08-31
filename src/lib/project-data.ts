export const projectCategories = [
  { id: "all", label: "All work" },
  { id: "fullstack", label: "Fullstack" },
  { id: "crypto", label: "Crypto" },
  { id: "website", label: "Websites" },
  { id: "n8n", label: "n8n workflows" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["id"];

export type PortfolioProject = {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, "all">;
  categoryLabel: string;
  description: string;
  outcome: string;
  stack: string[];
  year: string;
  visual: "crypto" | "commerce" | "automation" | "saas" | "editorial" | "dashboard";
  featured?: boolean;
  role?: string;
  demoUrl?: string;
  repositoryUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
};
