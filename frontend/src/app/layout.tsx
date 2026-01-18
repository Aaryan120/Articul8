import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-editorial-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-editorial-serif",
});

export const metadata: Metadata = {
  title: "Articul8 - Where Ideas Speak",
  description:
    "Articul8 is a calm, editorial reading space for thoughtful essays and stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <AppProvider>
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
