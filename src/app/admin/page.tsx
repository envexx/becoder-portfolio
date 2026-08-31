import { Button, Input, Label, TextArea, TextField } from "@heroui/react";
import { createProject, deleteProject, logout } from "./actions";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();
  const projects = await prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div><span className={styles.kicker}>NUGRAH / ADMIN</span><h1>Project archive</h1><p>Tambah karya nyata, tautan, dan screenshot tanpa mengubah kode.</p></div>
        <form action={logout}><Button type="submit" variant="outline">Sign out</Button></form>
      </header>
      <section className={styles.grid}>
        <form action={createProject} className={`${styles.panel} ${styles.form}`}>
          <div className={styles.panelHeading}><span>New project</span><small>{projects.length.toString().padStart(2, "0")} ENTRIES</small></div>
          <div className={styles.twoCols}>
            <Field name="title" label="Project name" placeholder="Nama proyek asli" />
            <label className={styles.nativeField}>Category<select name="category" required defaultValue="FULLSTACK"><option value="FULLSTACK">Fullstack</option><option value="CRYPTO">Crypto</option><option value="WEBSITE">Website</option><option value="N8N">n8n workflow</option></select></label>
          </div>
          <TextField fullWidth isRequired name="description"><Label>Description</Label><TextArea variant="secondary" rows={4} placeholder="Apa yang Anda bangun dan masalah yang diselesaikan?" /></TextField>
          <div className={styles.twoCols}><Field name="role" label="Your role" placeholder="Fullstack Developer" /><Field name="year" label="Year" placeholder="2026" type="number" /></div>
          <Field name="technologies" label="Technologies" placeholder="Next.js, TypeScript, Prisma" />
          <div className={styles.twoCols}><Field name="demoUrl" label="Demo URL" placeholder="https://" type="url" required={false} /><Field name="repositoryUrl" label="Repository URL" placeholder="https://github.com/" type="url" required={false} /></div>
          <div className={styles.twoCols}><Field name="outcome" label="Measured result" placeholder="Opsional—hanya hasil nyata" required={false} /><Field name="sortOrder" label="Display order" placeholder="0" type="number" required={false} /></div>
          <Field name="imageUrl" label="Existing image URL" placeholder="https:// (opsional jika upload)" type="url" required={false} />
          <Field name="imageAlt" label="Image description" placeholder="Dashboard analytics proyek…" required={false} />
          <label className={styles.upload}>Project screenshot<input name="image" type="file" accept="image/jpeg,image/png,image/webp" /><small>PNG, JPG, atau WebP · maksimum 4 MB · membutuhkan Vercel Blob</small></label>
          <div className={styles.checks}><label><input name="isPublished" type="checkbox" /> Tampilkan publik</label><label><input name="isFeatured" type="checkbox" /> Featured</label></div>
          <Button className="dark-pill-button" type="submit" variant="ghost">Save project</Button>
        </form>
        <aside className={styles.panel}>
          <div className={styles.panelHeading}><span>Published work</span><small>LIVE DATABASE</small></div>
          <div className={styles.projectList}>
            {projects.length === 0 && <p className={styles.empty}>Belum ada proyek di database. Landing page tetap memakai preview sementara sampai karya pertama dipublikasikan.</p>}
            {projects.map((project) => <article key={project.id}><div><small>{project.category} · {project.year}</small><h2>{project.title}</h2><p>{project.isPublished ? "Published" : "Draft"}{project.isFeatured ? " · Featured" : ""}</p></div><form action={deleteProject}><input type="hidden" name="id" value={project.id} /><Button type="submit" variant="danger">Delete</Button></form></article>)}
          </div>
        </aside>
      </section>
    </main>
  );
}

function Field({ name, label, placeholder, type = "text", required = true }: { name: string; label: string; placeholder: string; type?: string; required?: boolean }) {
  return <TextField fullWidth isRequired={required} name={name} type={type}><Label>{label}</Label><Input variant="secondary" placeholder={placeholder} /></TextField>;
}
