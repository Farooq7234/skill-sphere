import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import {
  ClerkProvider,
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Skillsphere",
  description: "A platform for skill sharing and learning",
};

export default function RootLayout({ children }) {
  return (
    <>
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >          {children}
        </body>
      </html>
    </ClerkProvider>
    <Footer />
    </>
  );
}
