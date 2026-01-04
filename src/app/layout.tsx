import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Automeet",
  description: "Putting your people together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <AuthProvider>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <div className="w-full min-h-screen bg-repeat bg-[url('../public/background-image.jpg')] -z-10 overflow-hidden">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html >
  );
}
