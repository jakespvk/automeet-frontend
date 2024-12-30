"use client";
import Script from "next/script";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
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
        <html lang="en">
            <head>
                <Script src="https://kit.fontawesome.com/a3773279a3.js" crossOrigin="anonymous" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-gray-200`}
            >
                <Navbar />
                {children}
            </body>
        </html >
    );
}
