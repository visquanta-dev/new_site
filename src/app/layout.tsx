import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AutoMaster Suite | Visquanta",
  description: "AI-Powered Dealership Platform - The unfair advantage elite dealerships use",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable} style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
