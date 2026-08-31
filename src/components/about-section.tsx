"use client";

import { Button, Card, Chip } from "@heroui/react";
import { ArrowUpRight, Asterisk, Circle, Code2, Database, Layers3, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./about-section.module.css";
import { portfolioContent as content } from "@/lib/portfolio-content";

const easeOut = [0.2, 0, 0, 1] as const;
const studioMarks = [
  { name: "Interface", Icon: Layers3 },
  { name: "Systems", Icon: Code2 },
  { name: "Data", Icon: Database },
  { name: "Motion", Icon: Sparkles },
] as const;

export function AboutSection() {
  const reduceMotion = useReducedMotion();
  const handleStartProject = () => {
    window.location.href = `${content.whatsapp}?text=Halo%20Nugrah%2C%20saya%20ingin%20mendiskusikan%20sebuah%20proyek.`;
  };

  return (
    <section className={styles.shell} id="about" aria-labelledby="about-title">
      <div className={styles.panel}>
        <motion.div
          className={styles.headingBlock}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: easeOut }}
        >
          <Chip className={styles.eyebrow} size="md" variant="soft">
            <Asterisk size={14} aria-hidden="true" />
            <Chip.Label>About me</Chip.Label>
          </Chip>
          <h2 id="about-title">
            Human-centered digital,
            <span>built for production.</span>
          </h2>
        </motion.div>

        <div className={styles.cardsGrid}>
          <motion.div
            className={styles.locationWrap}
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduceMotion ? 0 : 0.58, ease: easeOut }}
          >
            <Card className={styles.locationCard} variant="transparent">
              <div className={styles.locationShade} aria-hidden="true" />
              <Card.Content className={styles.locationContent}>
                <Chip className={styles.availabilityChip} size="md" variant="secondary">
                  <Circle size={8} fill="currentColor" aria-hidden="true" />
                  <Chip.Label>Available for worldwide projects</Chip.Label>
                </Chip>
                <p>Based in</p>
                <h3>{content.location}</h3>
                <Button
                  className={`${styles.projectButton} dark-pill-button`}
                  size="lg"
                  variant="ghost"
                  onPress={handleStartProject}
                >
                  Start a project
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Button>
              </Card.Content>
            </Card>
          </motion.div>

          <motion.div
            className={styles.sideCards}
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : 0.08, ease: easeOut }}
          >
            <Card className={styles.statCard} variant="default">
              <Card.Header>
                <Card.Description className={styles.statCopy}>
                  Four years building fullstack products, AI integrations, crypto experiences, and practical automation.
                </Card.Description>
              </Card.Header>
              <Card.Footer className={styles.statFooter}>
                <div className={styles.stars}>PRODUCTION EXPERIENCE</div>
                <strong>4<span> yrs</span></strong>
              </Card.Footer>
            </Card>

            <Card className={styles.quoteCard} variant="default">
              <Card.Content className={styles.quoteContent}>
                <div className={styles.avatar} aria-hidden="true">BC</div>
                <blockquote>
                  <span aria-hidden="true">“</span>
                  I care about the part users see and the systems that keep it dependable behind the scenes.
                  <footer>{content.professionalName} <small>{content.role}</small></footer>
                </blockquote>
              </Card.Content>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className={styles.trustStrip}
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: easeOut }}
        >
          <p>Focused on the details<br />that make products last</p>
          <div className={styles.marks}>
            {studioMarks.map(({ name, Icon }) => (
              <span key={name}><Icon size={23} strokeWidth={1.7} aria-hidden="true" />{name}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
