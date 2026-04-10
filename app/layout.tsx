import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mi Sitio Fullstack",
  description: "Aplicación fullstack moderna con Next.js 14, TypeScript y Vercel",
  keywords: ["Next.js", "TypeScript", "Vercel", "Fullstack"],
  authors: [{ name: "Claude" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
