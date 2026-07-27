import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clutch Command | Win Two More Points",
  description: "An AI-powered tennis pressure-performance platform. The narrow loss, solved.",
  openGraph: {
    title: "Clutch Command | Win Two More Points",
    description: "An AI-powered tennis pressure-performance platform.",
    url: "https://clutchcommand.com",
    siteName: "Clutch Command",
    images: [
      {
        url: "https://clutchcommand.com/og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
