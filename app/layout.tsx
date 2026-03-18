import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ViralMind AI — From Meeting Room to Viral Content",
  description: "AI-powered social media content pipeline. Transform business meeting summaries into viral tweets, content topics, and production-ready scripts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#05050a] text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
