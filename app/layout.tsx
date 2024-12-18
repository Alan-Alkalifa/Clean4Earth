import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { Analytics } from "@vercel/analytics/react"
import { CartProvider } from '@/context/CartContext'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Clean4Earth - Sustainability Campaign at UPJ",
  description: "Join our movement for a cleaner, greener campus and planet at Universitas Pembagungan Jaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script 
          type="text/javascript"
          src="https://app.midtrans.com/snap/snap.js"
          data-client-key="Mid-client-oK9RZNfZ6G-HuQYM"
        />
      </head>
      <Analytics />
      <body className={`${poppins.variable} font-poppins flex flex-col min-h-screen`}>
        <CartProvider>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
