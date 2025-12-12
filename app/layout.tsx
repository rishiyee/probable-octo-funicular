import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader"; // 👈 added

// SF PRO (global)
const sfPro = localFont({
  src: [
    { path: "../public/fonts/SF-Pro-Display-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/SF-Pro-Display-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/SF-Pro-Display-Semibold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/SF-Pro-Display-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-sf-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "rishiyee | portfolio",
  description: "Portfolio",
  icons: {
    icon: "/faviconfff.svg",
    shortcut: "/faviconfff.svg",
    apple: "/faviconfff.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sfPro.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
          rel="stylesheet"
        />
      </head>

      <body className="font-[var(--font-sf-pro)] bg-background text-foreground">
        <Preloader />

        <SmoothScroll />

        {/* Required wrappers for ScrollSmoother */}
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
