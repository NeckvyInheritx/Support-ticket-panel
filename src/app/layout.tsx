import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Next.js default font, can be removed or changed
import "./globals.css"; // Tailwind CSS imports
import Providers from "@/providers/Providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] }); // Next.js default font setup


export const metadata: Metadata = {
  title: "Support Panel",
  description: "A support ticket panel built with Next.js and Medusa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply Inter font class globally if desired */}
      <body className={inter.className}>
        <Providers>
              {children}
               <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </Providers>
      </body>
    </html>
  );
}