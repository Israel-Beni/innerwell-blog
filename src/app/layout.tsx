import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Innerwell Reflections - Mental Health Insights",
  description:
    "Explore our collection of mental health insights, therapeutic approaches, and personal growth stories from Innerwell.",
  keywords:
    "mental health, therapy, reflections, innerwell, emotional wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <script
          async
          src="https://cse.google.com/cse.js?cx=65e4c17a1ed964b4d"
        ></script>
        <div className="gcse-search"></div>
      </body>
    </html>
  );
}
