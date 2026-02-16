import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thejohnmathews.com"),
  title: {
    default: "thejohnmathews.com",
    template: "%s | thejohnmathews.com",
  },
  description:
    "John Mathews — software developer with experience in embedded systems and web development. Explore projects, work experience, and more.",
  keywords: [
    "John Mathews",
    "software developer",
    "embedded systems",
    "web development",
    "portfolio",
  ],
  authors: [{ name: "John Mathews" }],
  creator: "John Mathews",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thejohnmathews.com",
    siteName: "thejohnmathews.com",
    title: "thejohnmathews.com",
    description:
      "John Mathews — software developer with experience in embedded systems and web development.",
  },
  twitter: {
    card: "summary",
    title: "thejohnmathews.com",
    description:
      "John Mathews — software developer with experience in embedded systems and web development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
