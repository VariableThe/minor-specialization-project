import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gait Biometrics — Passive Gait Authentication",
  description:
    "Passive user authentication from wearable & smartphone inertial gait signals — an IMU metric-learning baseline with paper-inspired classification and efficiency comparisons.",
};

function themeInit() {
  return `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":(window.matchMedia("(prefers-color-scheme: light)").matches?false:true);if(t==null&&!window.matchMedia){d=true;}var r=document.documentElement;r.dataset.theme=d?"dark":"light";r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){document.documentElement.dataset.theme="dark";}})();`;
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} scroll-smooth`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit() }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
