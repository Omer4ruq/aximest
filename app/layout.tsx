import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";
import Cursor from "./components/Cursor";
import { site } from "./lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://aximest.com"),
  title: {
    default: `${site.name} — An Elite Team of Software Engineers`,
    template: `%s — ${site.name}`,
  },
  description:
    "A North American team of specialists with profound technical expertise. Advisory, blockchain, product development, enterprise software and AI.",
  openGraph: {
    title: `${site.name} — An Elite Team of Software Engineers`,
    description:
      "Digital architectures for an ever-shifting world. Advisory, blockchain, product development, enterprise software and AI.",
    siteName: site.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SmoothScroll />
        <PageTransition />
        <Cursor />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
