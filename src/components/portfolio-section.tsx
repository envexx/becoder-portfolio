"use client";

import type { Key } from "react";
import { Card, Chip, Tabs } from "@heroui/react";
import { Asterisk, ArrowUpRight, BarChart3, Blocks, Bot, CircleDollarSign, Database, Globe2, Workflow } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import { portfolioProjects, projectCategories, type PortfolioProject, type ProjectCategory } from "@/lib/project-data";
import styles from "./portfolio-section.module.css";

const easeOut = [0.2, 0, 0, 1] as const;

function ProjectVisual({ project }: { project: PortfolioProject }) {
  const Icon = project.category === "crypto" ? CircleDollarSign : project.category === "n8n" ? Workflow : Globe2;

  return (
    <div className={`${styles.visual} ${styles[project.visual]}`}>
      <div className={styles.browserBar}>
        <span /><span /><span />
        <small>{project.categoryLabel}</small>
      </div>
      {project.imageUrl ? (
        <Image className={styles.projectImage} src={project.imageUrl} alt={project.imageAlt ?? `${project.title} project preview`} fill sizes="(max-width: 980px) 100vw, 50vw" />
      ) : project.visual === "automation" ? (
        <div className={styles.workflowCanvas}>
          {[Bot, Database, Blocks, BarChart3].map((NodeIcon, index) => (
            <div className={styles.workflowNode} key={index}><NodeIcon size={19} /><span>{["Trigger", "Enrich", "Qualify", "Route"][index]}</span></div>
          ))}
          <i /><i /><i />
        </div>
      ) : (
        <div className={styles.productCanvas}>
          <div className={styles.previewIntro}>
            <Icon size={22} />
            <span>{project.categoryLabel}</span>
            <strong>{project.title.split(" ").slice(0, 2).join(" ")}</strong>
            <small>{project.outcome}</small>
          </div>
          <div className={styles.previewPanel}>
            <div className={styles.previewMetric}><small>Overview</small><strong>{project.visual === "crypto" ? "$128.4K" : project.visual === "commerce" ? "2,840" : "98.6%"}</strong></div>
            <div className={styles.chart}><span /><span /><span /><span /><span /><span /></div>
            <div className={styles.previewRows}><i /><i /><i /></div>
          </div>
        </div>
      )}
      {project.demoUrl ? <a className={styles.visualLabel} href={project.demoUrl} target="_blank" rel="noreferrer"><span>View live project</span><ArrowUpRight size={16} /></a> : <div className={styles.visualLabel}><span>Selected work</span><ArrowUpRight size={16} /></div>}
    </div>
  );
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout="position"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
      transition={{ duration: reduceMotion ? 0 : 0.36, delay: reduceMotion ? 0 : Math.min(index * 0.055, 0.22), ease: easeOut }}
      className={styles.projectArticle}
    >
      <Card className={styles.projectCard} variant="default">
        <Card.Content className={styles.cardContent}>
          <ProjectVisual project={project} />
          <div className={styles.projectMeta}>
            <div className={styles.projectTitle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><p>{project.categoryLabel}</p><h3>{project.title}</h3></div>
            </div>
            <p className={styles.description}>{project.description}</p>
            <dl>
              <div><dt>{project.role ? "Role" : "Outcome"}</dt><dd>{project.role ?? project.outcome}</dd></div>
              <div><dt>Stack</dt><dd>{project.stack.join(" · ")}</dd></div>
              <div><dt>Year</dt><dd>{project.year}</dd></div>
            </dl>
          </div>
        </Card.Content>
      </Card>
    </motion.article>
  );
}

export function PortfolioSection({ projects = portfolioProjects }: { projects?: PortfolioProject[] }) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.shell} id="works" aria-labelledby="works-title">
      <div className={styles.panel}>
        <motion.header
          className={styles.header}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.52, ease: easeOut }}
        >
          <div>
            <Chip className={styles.eyebrow} size="md" variant="soft"><Asterisk size={14} /><Chip.Label>Featured work</Chip.Label></Chip>
            <h2 id="works-title">Selected projects,<br /><span>organized by craft.</span></h2>
          </div>
          <p>A focused archive of fullstack products, crypto interfaces, marketing websites, and n8n automation systems.</p>
        </motion.header>

        <Tabs
          className={styles.tabs}
          selectedKey={activeCategory}
          onSelectionChange={(key: Key) => setActiveCategory(key as ProjectCategory)}
        >
          <Tabs.ListContainer className={styles.tabContainer}>
            <Tabs.List aria-label="Filter projects by category" className={styles.tabList}>
              {projectCategories.map((category) => (
                <Tabs.Tab className={styles.tab} id={category.id} key={category.id}>
                  {category.label}
                  <span>{projects.filter((project) => category.id === "all" || project.category === category.id).length}</span>
                  <Tabs.Indicator className={styles.indicator} />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>

          {projectCategories.map((category) => {
            const filteredProjects = projects.filter((project) => category.id === "all" || project.category === category.id);
            return (
              <Tabs.Panel className={styles.tabPanel} id={category.id} key={category.id}>
                <motion.div layout className={styles.projectsGrid}>
                  <AnimatePresence mode="popLayout" initial={false}>
                    {filteredProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}
                  </AnimatePresence>
                </motion.div>
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
