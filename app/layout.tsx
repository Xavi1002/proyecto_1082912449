import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Proyecto Fullstack",
  description: "Generado por Claude - Ingeniero DevOps/Fullstack Senior",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
