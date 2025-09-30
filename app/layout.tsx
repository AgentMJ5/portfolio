import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Jathin Mandapati — AI Engineer Portfolio",
  description: "Generative AI Engineer • Agentic AI • RAG • Security-first systems",
  icons: {
    icon: "/favicon.ico",          // put favicon.ico in /public
    shortcut: "/favicon.ico",
    apple: "/icon.png",            // optional 512x512 png in /public
  },
  openGraph: {
    title: "Jathin Mandapati — AI Engineer",
    description: "Projects, journey, and publications",
    images: ["/images/me.jpg"],    // already in /public/images
  },
  metadataBase: new URL("https://jathinmandapati.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
