import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { cn } from "./_utils/helpers/common";
import { Footer, Header } from "./_components/containers/layout";
import { ModelVersion } from "./_components/containers/model/version";

import "./globals.css";
import { QueryClientProviderWrapper } from "./_components/providers/query-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Object Detection & Auto Recording | Smart Video Capture",
  description:
    "Web-based AI app using TensorFlow.js COCO-SSD model to detect, track, and record objects in real time. Choose objects, auto-record, preview, and download securely in your browser.",
  keywords: [
    "AI video recorder",
    "object detection app",
    "COCO-SSD",
    "TensorFlow.js video",
    "automatic video recording",
    "webcam AI detection",
    "real-time object detection",
    "AI surveillance browser",
    "Next.js object detection",
    "record video when object detected",
  ],
  authors: [{ name: "Mykola Lebid" }],
  openGraph: {
    title: "AI Object Detection & Auto Recording | Smart Video Capture",
    description:
      "Detect and record important objects with AI in real time. Works in your browser with webcam or mobile camera. Secure, private, and easy to use.",
    url: "https://webcam-coco-ssd-objects-detection.vercel.app",
    siteName: "Smart Video AI Recorder",
    images: [
      {
        url: "https://webcam-coco-ssd-objects-detection.vercel.app/og_image.png",
        width: 1200,
        height: 630,
        alt: "AI Object Detection Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Object Detection & Auto Recording | Smart Video Capture",
    description:
      "Browser-based AI app that detects objects in real time and records videos automatically.",
    images: [
      "https://webcam-coco-ssd-objects-detection.vercel.app/og_image.png",
    ],
    creator: "@realkolos",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(geistSans.variable, geistMono.variable, "antialiased")}
      >
        <QueryClientProviderWrapper>
          <div className="flex flex-col h-screen">
            <Header className="px-4 max-w-7xl mx-auto w-full">
              <ModelVersion className="badge badge-secondary" />
            </Header>
            <main className="flex-1 overflow-auto px-4 max-w-7xl mx-auto w-full">
              {children}
            </main>
            <Footer className="[&_footer]:px-4 [&_footer]:max-w-7xl [&_footer]:mx-auto [&_footer]:w-full" />
          </div>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
