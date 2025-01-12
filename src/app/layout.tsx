"use client";
import Script from "next/script";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/components/ui/provider"
import Navbar from "@/components/ui/navbar";

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

/*export const metadata: Metadata = {
    title: "Automeet",
    description: "Putting your people together",
};*/

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <Script src="https://kit.fontawesome.com/a3773279a3.js" crossOrigin="anonymous" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-gray-200`}
            >
                <Navbar />
                <Provider>
                    <div className="w-full min-h-screen bg-repeat bg-[url('../public/background-image.jpg')] -z-10 overflow-hidden">
                        {children}
                    </div>
                </Provider>
            </body>
        </html >
    );
}
