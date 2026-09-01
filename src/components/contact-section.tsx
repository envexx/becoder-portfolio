"use client";

import type { FormEvent } from "react";
import { Button, Chip, FieldError, Form, Input, Label, TextArea, TextField } from "@heroui/react";
import { ArrowUp, ArrowUpRight, Asterisk, BriefcaseBusiness, Camera, Code2, Mail, MapPin, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import styles from "./contact-section.module.css";
import { portfolioContent as content } from "@/lib/portfolio-content";

const easeOut = [0.2, 0, 0, 1] as const;

export function ContactSection() {
  const reduceMotion = useReducedMotion();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`);
    window.location.href = `mailto:${content.email}?subject=${subject}&body=${body}`;
  };

  return (
    <footer className={styles.shell} id="contact" aria-labelledby="contact-title">
      <section className={styles.contactPanel}>
        <div className={styles.noise} aria-hidden="true" />
        <motion.div
          className={styles.contactCopy}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: easeOut }}
        >
          <Chip className={styles.eyebrow} size="md" variant="soft"><Asterisk size={14} /><Chip.Label>Contact</Chip.Label></Chip>
          <h2 id="contact-title">Let&apos;s build<br />something useful.</h2>
          <p>Have a product, website, crypto idea, or workflow that needs a thoughtful technical partner? Tell me what you&apos;re planning.</p>
          <div className={styles.contactDetails}>
            <a href={`mailto:${content.email}`}><span><Mail size={18} /></span><small>Email</small><strong>{content.email}</strong></a>
            <a href={content.whatsapp} target="_blank" rel="noreferrer"><span><MessageCircle size={18} /></span><small>WhatsApp</small><strong>+62 877 4859 7957</strong></a>
            <div><span><MapPin size={18} /></span><small>Based in</small><strong>{content.location}</strong></div>
          </div>
        </motion.div>

        <div className={styles.portrait} aria-hidden="true">
          <Image src="/nugrah-portrait-original.png" alt="" fill sizes="(max-width: 860px) 92vw, 34vw" />
        </div>

        <motion.div
          className={styles.formCard}
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : 0.08, ease: easeOut }}
        >
          <div className={styles.formHeading}><span>Start a conversation</span><small>Usually replies within 1–2 days</small></div>
          <Form className={styles.form} aria-label="Project inquiry" onSubmit={handleSubmit}>
            <div className={styles.fieldRow}>
              <TextField className={styles.field} fullWidth isRequired minLength={2} name="name">
                <Label>Your name</Label>
                <Input variant="secondary" placeholder="Enter your full name" autoComplete="name" />
                <FieldError>Please enter at least 2 characters.</FieldError>
              </TextField>
              <TextField
                className={styles.field}
                fullWidth
                isRequired
                name="email"
                type="email"
                validate={(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Enter a valid email address."}
              >
                <Label>Email address</Label>
                <Input variant="secondary" placeholder="you@company.com" autoComplete="email" />
                <FieldError />
              </TextField>
            </div>
            <TextField
              className={`${styles.field} ${styles.messageField}`}
              fullWidth
              isRequired
              minLength={20}
              name="message"
              validate={(value) => value.length >= 20 ? null : "Tell me a little more—minimum 20 characters."}
            >
              <Label>About your project</Label>
              <TextArea variant="secondary" rows={6} placeholder="What are you building, and where do you need help?" />
              <FieldError />
            </TextField>
            <Button className={`${styles.submitButton} dark-pill-button`} fullWidth size="lg" type="submit" variant="ghost">
              Send project inquiry <ArrowUpRight size={17} aria-hidden="true" />
            </Button>
          </Form>
        </motion.div>
      </section>

      <section className={styles.socialSection} aria-label="Social links">
        <div className={styles.ghostWord} aria-hidden="true">BECODER</div>
        <motion.div
          className={styles.socialContent}
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.48, ease: easeOut }}
        >
          <div className={styles.footerMark} aria-hidden="true"><span /><span /></div>
          <h3>Let&apos;s stay connected.</h3>
          <p>Projects, experiments, and occasional development notes.</p>
          <div className={styles.socialLinks}>
            <a href={content.social.github} rel="noreferrer" target="_blank">GitHub <Code2 size={16} /></a>
            <a href={content.social.linkedin} rel="noreferrer" target="_blank">LinkedIn <BriefcaseBusiness size={16} /></a>
            <a href={content.social.instagram} rel="noreferrer" target="_blank">Instagram <Camera size={16} /></a>
            <a href={content.social.x} rel="noreferrer" target="_blank">X / Twitter <ArrowUpRight size={16} /></a>
          </div>
        </motion.div>
      </section>

      <div className={styles.footerBar}>
        <nav aria-label="Footer navigation"><a href="#about">About</a><a href="#services">Services</a><a href="#works">Works</a><a href="#contact">Contact</a></nav>
        <p>© {new Date().getFullYear()} {content.name}. Built with care.</p>
        <a href="#top">Back to top <ArrowUp size={13} /></a>
      </div>
    </footer>
  );
}
