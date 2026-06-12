import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Manrope, Inter } from "next/font/google";
import "./globals.css";
import ToastClient from "@/Components/ToastClient";
import { SocketProvider } from "@/contexts/SocketProvider";
import BottomNavigation from "@/Components/Shared/BottomNavigation";
import ChatBubbles from "@/Components/Shared/ChatBubbles";
import CookieConsent from "@/Components/Shared/CookieConsent";
import AppFooter from "@/Components/Shared/AppFooter";
import ReduxProvider from "@/Components/ReduxProvider";
import { ClerkProvider } from "@clerk/nextjs";
import ClerkSyncProvider from "@/Components/ClerkSyncProvider";

import FacebookFragmentFix from '@/Components/FacebookFragmentFix';
import ThemeStyleInjector from '@/Components/Shared/ThemeStyleInjector';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Labwards",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-labwards.png", type: "image/png", sizes: "192x192" },
      { url: "/logo-labwards.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/logo-labwards.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};


export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0D0F1E" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Inline script: restores saved theme before first paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${manrope.variable} ${inter.variable} antialiased`}
      >
        <FacebookFragmentFix />
        <ThemeStyleInjector />
        <ClerkProvider>
          <ClerkSyncProvider>
            <ReduxProvider>
              <SocketProvider>
                {children}
                <AppFooter />
                <BottomNavigation />
                <ChatBubbles />
                <CookieConsent />
                <ToastClient />
              </SocketProvider>
            </ReduxProvider>
          </ClerkSyncProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
