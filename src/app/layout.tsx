import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ variable: "--font-display", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://nugrah.becoder.xyz"),
  title: "Nugrah Salam — Fullstack Developer & AI Engineer",
  description: "Portfolio Nugrah Salam Harahap, fullstack developer dan AI engineer di Batam yang membangun web products, crypto experiences, dan n8n automation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${archivo.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
