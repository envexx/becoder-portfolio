import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "nugrah_admin";

function secret() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function signature() {
  return createHmac("sha256", secret()).update("nugrah-portfolio-admin").digest("hex");
}

export async function isAdmin() {
  const current = (await cookies()).get(COOKIE_NAME)?.value;
  const expected = signature();
  if (!current || !secret() || current.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(current), Buffer.from(expected));
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function createAdminSession() {
  (await cookies()).set(COOKIE_NAME, signature(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}
