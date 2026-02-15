import Link from "next/link";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: {
    default: "Hachi Docs",
    template: "%s | Hachi Docs",
  },
  description: "Next.js docs scaffold for Hachi architecture visualization.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${monoFont.variable}`}>
        <div className="site-shell">
          <header className="site-header">
            <div className="brand-block">
              <p className="brand-tag">Hachi</p>
              <p className="brand-name">Architecture Docs Site</p>
            </div>
            <nav className="site-nav">
              <Link href="/">Overview</Link>
              <Link href="/architecture">Architecture Map</Link>
              <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer">
                Next.js
              </a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
