import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/** components */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

/**
 * IMPROVEMENTS:
 *  + beginning of dark mode support
 *  + global navbar and footer
 *  + basic padding and centering, added container for main content
 */

export const metadata: Metadata = {
  title: "Advocatr - Find your Advocate",
  description: "Seth Balodi's attempt at the Solace assignment :)",
};

/**
 * The main app layout component.
 * @param {{ children: React.ReactNode; testMode?: boolean }} props - The component props.
 * @returns {JSX.Element} The JSX element for the app layout.
 */
export default function RootLayout({
  children,
  testMode = false,
}: {
  children: React.ReactNode;
  testMode?: boolean;
}): JSX.Element {
  const content = (
    <>
      <Navbar />
      <main id="appContainer" className="max-w-7xl mx-auto p-6 rounded-3xl">
        {children}
      </main>
      <Footer />
    </>
  );

  if (testMode) {
    return (
      <div lang="en" className={inter.className}>
        <div className="bg-gray-300 text-gray-800">{content}</div>
      </div>
    );
  }

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-300 text-gray-800">{content}</body>
    </html>
  );
}
