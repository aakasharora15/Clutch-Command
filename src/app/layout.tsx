import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
});

import SmoothScrolling from "@/components/SmoothScrolling";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollAnimations from "@/components/ScrollAnimations";

export const metadata: Metadata = {
  metadataBase: new URL("https://clutchcommand.com"),
  title: "Clutch Command | Win Two More Points",
  description: "An AI-powered tennis pressure-performance platform. The narrow loss, solved.",
  openGraph: {
    title: "Clutch Command | Win Two More Points",
    description: "An AI-powered tennis pressure-performance platform.",
    url: "https://clutchcommand.com",
    siteName: "Clutch Command",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Clutch Command Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clutch Command | Win Two More Points",
    description: "An AI-powered tennis pressure-performance platform.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Placeholder for Meta Pixel ID */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'REPLACE_WITH_META_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${bebas.variable}`}>
        <SmoothScrolling>
          <CustomCursor />
          <ScrollProgress />
          <ScrollAnimations />
          <div className="noise-overlay"></div>
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </SmoothScrolling>
      </body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  );
}
