import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "No-as-a-Service | Say No. Creatively.",
  description:
    "Generate creative rejection reasons instantly. Copy, share, and customize witty ways to say no.",
  metadataBase: new URL("https://no-as-a-service-web.vercel.app"),
  keywords: [
    "no as a service",
    "rejection generator",
    "say no",
    "creative excuses",
    "funny rejection",
    "naas",
  ],
  authors: [{ name: "yasharyas", url: "https://github.com/yasharyas" }],
  creator: "yasharyas",
  openGraph: {
    type: "website",
    title: "No-as-a-Service | Say No. Creatively.",
    description:
      "Generate creative rejection reasons instantly. Copy, share, and customize witty ways to say no.",
    url: "https://no-as-a-service-web.vercel.app",
    siteName: "No-as-a-Service",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "No-as-a-Service — Say No. Creatively.",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "No-as-a-Service | Say No. Creatively.",
    description:
      "Generate creative rejection reasons instantly. Copy, share, and customize witty ways to say no.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script to set dark mode before paint — prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (mode === 'dark' || (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "No-as-a-Service",
              url: "https://no-as-a-service-web.vercel.app",
              description:
                "Generate creative rejection reasons instantly. Copy, share, and customize witty ways to say no.",
              applicationCategory: "Entertainment",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Person",
                name: "yasharyas",
                url: "https://github.com/yasharyas",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
