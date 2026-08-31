"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession, requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function login(formData: FormData) {
  const supplied = String(formData.get("password") ?? "");
  if (!process.env.ADMIN_PASSWORD || supplied !== process.env.ADMIN_PASSWORD) redirect("/admin/login?error=1");
  await createAdminSession();
  redirect("/admin");
}

export async function logout() {
  await clearAdminSession();
  redirect("/admin/login");
}

function required(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) throw new Error(`${key} wajib diisi.`);
  return value;
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const title = required(formData, "title");
  const image = formData.get("image");
  let imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;

  if (image instanceof File && image.size > 0) {
    if (image.size > 4_000_000) throw new Error("Ukuran gambar maksimal 4 MB.");
    if (!image.type.startsWith("image/")) throw new Error("File harus berupa gambar.");
    const blob = await put(`projects/${image.name}`, image, { access: "public", addRandomSuffix: true });
    imageUrl = blob.url;
  }

  const slugBase = title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  await prisma.project.create({
    data: {
      slug: `${slugBase}-${Date.now().toString(36)}`,
      title,
      category: required(formData, "category") as "FULLSTACK" | "CRYPTO" | "WEBSITE" | "N8N",
      description: required(formData, "description"),
      outcome: String(formData.get("outcome") ?? "").trim() || null,
      role: required(formData, "role"),
      technologies: required(formData, "technologies").split(",").map((item) => item.trim()).filter(Boolean),
      year: Number(required(formData, "year")),
      demoUrl: String(formData.get("demoUrl") ?? "").trim() || null,
      repositoryUrl: String(formData.get("repositoryUrl") ?? "").trim() || null,
      imageUrl,
      imageAlt: String(formData.get("imageAlt") ?? "").trim() || `${title} project preview`,
      isPublished: formData.get("isPublished") === "on",
      isFeatured: formData.get("isFeatured") === "on",
      sortOrder: Number(formData.get("sortOrder") ?? 0),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?created=1");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  await prisma.project.delete({ where: { id: required(formData, "id") } });
  revalidatePath("/");
  revalidatePath("/admin");
}
