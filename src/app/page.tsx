import { PortfolioHero } from "@/components/portfolio-hero";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ContactSection } from "@/components/contact-section";
import type { PortfolioProject } from "@/lib/project-data";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  let projects: PortfolioProject[] | undefined;
  if (process.env.DATABASE_URL) {
    const records = await prisma.project.findMany({ where: { isPublished: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
    if (records.length) projects = records.map((project) => ({
      id: project.id, title: project.title,
      category: project.category.toLowerCase() as PortfolioProject["category"],
      categoryLabel: project.category === "N8N" ? "n8n workflow" : project.category.toLowerCase(),
      description: project.description, outcome: project.outcome ?? "Selected project",
      stack: project.technologies, year: String(project.year),
      visual: project.category === "N8N" ? "automation" : project.category === "CRYPTO" ? "crypto" : "saas",
      featured: project.isFeatured, role: project.role,
      demoUrl: project.demoUrl ?? undefined, repositoryUrl: project.repositoryUrl ?? undefined,
      imageUrl: project.imageUrl ?? undefined, imageAlt: project.imageAlt ?? undefined,
    }));
  }
  return (
    <main>
      <PortfolioHero />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection projects={projects ?? []} />
      <ContactSection />
    </main>
  );
}
