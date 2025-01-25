import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
 * @param {React.PropsWithChildren<{}>} props - The component props.
 * @returns {JSX.Element} The JSX element for the app layout.
 */
export default function RootLayout({
  children,
}: React.PropsWithChildren<{}>): JSX.Element {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-300 text-gray-800">
        {/* The header contains the app title and a button to toggle dark mode */}
        <header className="p-4 shadow bg-white">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* The app title on the left */}
            <div>
              <h1 className="text-2xl font-bold">Advocatr</h1>
            </div>
            {/* The toggle dark mode button on the right */}
            <div>
              <button
                id="toggleDarkMode"
                className="p-2 bg-teal-600 text-white rounded-md cursor-pointer hover:bg-teal-700"
              >
                Toggle Dark Mode
              </button>
            </div>
          </div>
        </header>
        {/* The main app content is contained within this element */}
        <main id="appContainer" className="max-w-7xl mx-auto p-6 rounded-3xl">
          {children}
        </main>
        {/* The footer contains the copyright information */}
        <footer className="p-4 bg-gray-100 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Seth Balodi - Advocatr</p>
        </footer>
      </body>
    </html>
  );
}
