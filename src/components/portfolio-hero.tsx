"use client";

import { ArrowDown, ArrowUpRight, Asterisk, Braces, Database, Layers3, Sparkles } from "lucide-react";
import { Button, Chip } from "@heroui/react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { portfolioContent as content } from "@/lib/portfolio-content";

const easeOut = [0.2, 0, 0, 1] as const;
const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };
const technologyIcons = [Braces, Layers3, Database, Sparkles];

export function PortfolioHero() {
  const reduceMotion = useReducedMotion();
  const goTo = (href: string) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }

    window.location.href = href;
  };
  const container = {
    hidden: {},
    visible: {
      transition: reduceMotion ? { duration: 0 } : { staggerChildren: 0.075, delayChildren: 0.08 },
    },
  };

  return (
    <section className="hero-shell" aria-labelledby="hero-title">
      <motion.div className="hero-panel" initial="hidden" animate="visible" variants={container}>
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-ghost-word" aria-hidden="true">CREATIVE</div>

        <motion.header className="hero-header" variants={reveal} transition={{ duration: 0.45, ease: easeOut }}>
          <a className="brand-mark" href="#top" aria-label={`${content.professionalName} home`}>
            <span>{content.brand[0]}</span><span>{content.brand[1]}</span>
          </a>
          <div className="availability">
            <span className="availability-dot" aria-hidden="true" />
            <span>{content.availability.label}<small>{content.availability.detail}</small></span>
          </div>
          <nav aria-label="Primary navigation">
            <ul className="nav-list">
              {content.navigation.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}
            </ul>
          </nav>
          <Button className="header-cta dark-pill-button" variant="ghost" onPress={() => goTo(`mailto:${content.email}`)}>
            Start a project <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
          </Button>
        </motion.header>

        <div className="hero-grid">
          <motion.div className="hero-copy" variants={container}>
            <motion.div variants={reveal} transition={{ duration: 0.4, ease: easeOut }}>
              <Chip className="eyebrow" size="md" variant="soft">
                <Asterisk size={15} aria-hidden="true" />
                <Chip.Label>{content.eyebrow}</Chip.Label>
              </Chip>
            </motion.div>
            <motion.h1 id="hero-title" variants={reveal} transition={{ duration: 0.5, ease: easeOut }}>
              {content.headline.map((line) => <span key={line}>{line}</span>)}
            </motion.h1>
            <motion.p className="hero-description" variants={reveal} transition={{ duration: 0.45, ease: easeOut }}>
              {content.description}
            </motion.p>
            <motion.div className="hero-actions" variants={reveal} transition={{ duration: 0.45, ease: easeOut }}>
              <Button className="hero-button button-dark dark-pill-button" variant="ghost" onPress={() => goTo("#works")}>
                Explore my work <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
              <Button className="hero-button button-light" variant="ghost" onPress={() => goTo(content.whatsapp)}>
                Let&apos;s talk
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="portrait-stage"
            initial={reduceMotion ? false : { opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.75, delay: 0.18, ease: easeOut }}
          >
            <div className="portrait-halo" aria-hidden="true" />
            <div className="portrait-image-wrap">
              <Image
                className="portrait-image"
                src="/nugrah-portrait-original.png"
                alt={`Portrait of ${content.name}`}
                fill
                priority
                sizes="(max-width: 820px) 100vw, 48vw"
              />
            </div>
            <motion.div className="floating-card-wrap floating-card-left" aria-hidden="true" animate={reduceMotion ? undefined : { y: [0, -6, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}>
              <Chip className="floating-card" size="md" variant="soft"><Braces size={19} /><Chip.Label>build</Chip.Label></Chip>
            </motion.div>
            <motion.div className="floating-card-wrap floating-card-right" aria-hidden="true" animate={reduceMotion ? undefined : { y: [0, 7, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>
              <Chip className="floating-card" size="md" variant="soft"><Sparkles size={18} /><Chip.Label>craft</Chip.Label></Chip>
            </motion.div>
          </motion.div>

          <motion.aside className="hero-proof" variants={container} aria-label="Portfolio highlight">
            <motion.p variants={reveal} transition={{ duration: 0.45, ease: easeOut }}>{content.proof}</motion.p>
            <motion.div className="proof-rule" variants={reveal} aria-hidden="true"><span /><span /></motion.div>
            <motion.div className="metric" variants={reveal} transition={{ duration: 0.5, ease: easeOut }}>
              <small>{content.metric.label}</small>
              <strong>{content.metric.value}<em>{content.metric.suffix}</em></strong>
            </motion.div>
          </motion.aside>
        </div>

        <motion.footer className="hero-footer" variants={reveal} transition={{ duration: 0.45, ease: easeOut }}>
          <div className="tech-strip" aria-label="Core technologies">
            {content.technologies.map((technology, index) => {
              const Icon = technologyIcons[index];
              return <span key={technology}><Icon size={19} strokeWidth={1.7} aria-hidden="true" />{technology}</span>;
            })}
          </div>
          <a className="scroll-cue" href="#works">Scroll to explore <span><ArrowDown size={14} aria-hidden="true" /></span></a>
        </motion.footer>
      </motion.div>
    </section>
  );
}
