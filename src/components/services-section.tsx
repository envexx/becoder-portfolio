"use client";

import type { Key } from "@heroui/react";
import { Accordion, Chip } from "@heroui/react";
import { Asterisk, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import styles from "./services-section.module.css";

const easeOut = [0.2, 0, 0, 1] as const;
const services = [
  {
    id: "strategy",
    number: "01",
    title: "Fullstack Product Development",
    description: "Build complete web products from responsive interfaces and APIs to authentication, databases, testing, and production deployment.",
    capabilities: ["Next.js & React", "API & database", "Production deployment"],
  },
  {
    id: "experience",
    number: "02",
    title: "AI Integration & Engineering",
    description: "Add useful AI capabilities to existing or new products with grounded workflows, structured outputs, and reliable system integration.",
    capabilities: ["LLM integration", "AI-assisted features", "Python services"],
  },
  {
    id: "development",
    number: "03",
    title: "n8n Workflow Automation",
    description: "Replace repetitive operational work with maintainable workflows that connect business tools, APIs, data, and notifications.",
    capabilities: ["Workflow design", "Webhooks & APIs", "Monitoring & handoff"],
  },
  {
    id: "data",
    number: "04",
    title: "Crypto & Web3 Products",
    description: "Develop clear, secure-facing crypto interfaces and supporting backend services for dashboards, market data, and wallet-connected products.",
    capabilities: ["Web3 interfaces", "Market data APIs", "Wallet integrations"],
  },
] as const;

export function ServicesSection() {
  const reduceMotion = useReducedMotion();
  const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(new Set(["strategy"]));

  return (
    <section className={styles.shell} id="services" aria-labelledby="services-title">
      <div className={styles.panel}>
        <motion.div
          className={styles.intro}
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.48, ease: easeOut }}
        >
          <Chip className={styles.eyebrow} size="md" variant="soft">
            <Asterisk size={14} aria-hidden="true" />
            <Chip.Label>Services</Chip.Label>
          </Chip>
          <h2 id="services-title">Engineering from<br />idea to launch</h2>
          <p>
            One technical partner for product interfaces, backend systems, AI features, automation, and deployment.
          </p>
        </motion.div>

        <motion.div
          className={styles.accordionWrap}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
          }}
        >
          <Accordion
            hideSeparator
            className={styles.accordion}
            expandedKeys={expandedKeys}
            onExpandedChange={setExpandedKeys}
          >
            {services.map((service) => {
              const active = expandedKeys.has(service.id);
              return (
                <Accordion.Item
                  key={service.id}
                  id={service.id}
                  className={`${styles.accordionItem} ${active ? styles.activeItem : ""}`}
                >
                  <Accordion.Heading>
                    <Accordion.Trigger className={styles.trigger}>
                      <span>{service.title}</span>
                      <span className={styles.number}>{service.number}</span>
                      <Accordion.Indicator className={styles.indicator}>
                        <Plus size={17} aria-hidden="true" />
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body className={styles.body}>
                      <p>{service.description}</p>
                      <div className={styles.capabilities} aria-label={`${service.title} capabilities`}>
                        {service.capabilities.map((capability) => (
                          <Chip key={capability} className={styles.capability} size="sm" variant="soft">
                            <Chip.Label>{capability}</Chip.Label>
                          </Chip>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </motion.div>

        <motion.figure
          className={styles.imageCard}
          initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.1, ease: easeOut }}
        >
          <div className={styles.imageShade} aria-hidden="true" />
          <figcaption>Strategy, design, and engineering in one continuous loop.</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
