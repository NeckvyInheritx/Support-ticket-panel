import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Next.js default font, can be removed or changed
import "./globals.css"; // Tailwind CSS imports
import { MedusaProvider } from "medusa-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Only QueryClient, MedusaProvider uses it
import  { MEDUSA_BACKEND_URL } from "@/lib/medusa-client";
import Providers from "@/providers/Providers";
import Navbar from "@/components/orgmisms/Navbar";

const inter = Inter({ subsets: ["latin"] }); // Next.js default font setup

// Create a QueryClient instance once outside the component
const queryClient = new QueryClient();

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
        </Providers>
      </body>
    </html>
  );
}