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

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "chainpulse",
    title: "ChainPulse Analytics",
    category: "crypto",
    categoryLabel: "Crypto platform",
    description: "A wallet intelligence dashboard for monitoring assets, token movement, and on-chain risk in one focused workspace.",
    outcome: "Real-time portfolio insights",
    stack: ["Next.js", "TypeScript", "Web3", "Prisma"],
    year: "2026",
    visual: "crypto",
    featured: true,
  },
  {
    id: "flowdesk",
    title: "Lead Engine Workflow",
    category: "n8n",
    categoryLabel: "n8n automation",
    description: "An automated lead pipeline that qualifies inbound prospects, enriches records, and routes high-intent leads to the right channel.",
    outcome: "11 manual steps removed",
    stack: ["n8n", "Webhook", "PostgreSQL", "OpenAI"],
    year: "2026",
    visual: "automation",
  },
  {
    id: "northstar",
    title: "Northstar Commerce",
    category: "fullstack",
    categoryLabel: "Fullstack commerce",
    description: "A complete commerce experience with product management, checkout logic, customer accounts, and an operational dashboard.",
    outcome: "End-to-end product build",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
    year: "2025",
    visual: "commerce",
  },
  {
    id: "atelier",
    title: "Atelier Studio",
    category: "website",
    categoryLabel: "Brand website",
    description: "An editorial marketing site focused on precise typography, tactile interactions, and fast content discovery.",
    outcome: "98 Lighthouse score",
    stack: ["Next.js", "Motion", "CMS"],
    year: "2025",
    visual: "editorial",
  },
  {
    id: "opsline",
    title: "Opsline Control Room",
    category: "fullstack",
    categoryLabel: "Internal SaaS",
    description: "A role-based operations portal for tracking requests, service health, and team performance without spreadsheet handoffs.",
    outcome: "Single operational source",
    stack: ["React", "Node.js", "Prisma", "RBAC"],
    year: "2025",
    visual: "saas",
  },
  {
    id: "reportflow",
    title: "Automated Weekly Reports",
    category: "n8n",
    categoryLabel: "n8n reporting",
    description: "A scheduled reporting system that gathers business metrics, produces an AI summary, and delivers it automatically.",
    outcome: "4 hours saved weekly",
    stack: ["n8n", "REST API", "Sheets", "Slack"],
    year: "2025",
    visual: "dashboard",
  },
];
