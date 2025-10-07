import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amy: The First Online Travel Agency in Bangladesh - Flight | Hotel | Visa | Ready Office",
  description: "Air Ticket, Plane Ticket, Virtual Travel Agent, Flight Schedule, Airline, Airlines, Airport Information, NOVO Air, US Bangla, Regent, Biman, Befresh, Transport, PNR Search, Domestic, International, Indian Domestic, Chittagong, Online, Travel Agent, Virtual, Portal, Cheapest Price, Air Asia, Air Arabia, Fly Dubai, Indigo, SpiceJet, Go Air, Indian Airlines, Malaysian Airlines, Tiger Air, Discount Ticket Fare, Booking, Low Cost Airlines, Special Offer Ticket Fare, Promotion Air Ticket, Reward Point, Frequent Flyer, Malidivian Air, Salam Air",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <main className="min-h-screen">
            {children}
        </main>
      </body>
    </html>
  );
}
