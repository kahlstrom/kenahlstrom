import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kenneth Ahlstrom - Software Engineer & Product Manager",
  description: "Senior Software Engineer and Product Manager specializing in team leadership, application architecture, and modern web development. Currently building innovative solutions with React, Node.js, and enterprise technologies.",
  keywords: "Kenneth Ahlstrom, Software Engineer, Product Manager, Team Lead, React, Node.js, JavaScript, TypeScript, Adobe, Utah",
  author: "Kenneth Ahlstrom",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Kenneth Ahlstrom - Software Engineer & Product Manager",
    description: "Senior Software Engineer and Product Manager specializing in team leadership, application architecture, and modern web development.",
    url: "https://kenahlstrom.dev",
    siteName: "Kenneth Ahlstrom Portfolio",
    type: "website",
    images: [
      {
        url: "/kenahlstrom_ogimage.png",
        width: 1200,
        height: 630,
        alt: "Kenneth Ahlstrom - Software Engineer & Product Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenneth Ahlstrom - Software Engineer & Product Manager",
    description: "Senior Software Engineer and Product Manager specializing in team leadership, application architecture, and modern web development.",
    images: ["/kenahlstrom_ogimage.png"],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
