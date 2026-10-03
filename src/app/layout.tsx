import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nashik Crop Advisor | Hyper-local Agronomy & Weather Intelligence",
  description:
    "Scientific, hyper-local crop recommendations, financial projections, pest risk intelligence and live microclimate weather analytics for Maharashtra's Nashik district.",
  keywords: [
    "Nashik",
    "crop advisory",
    "agronomy",
    "Igatpuri",
    "Niphad",
    "Malegaon",
    "grapes",
    "onion",
    "paddy",
    "bajra",
  ],
  openGraph: {
    title: "Nashik Crop Advisor",
    description:
      "Hyper-local crop recommendations and microclimate weather analytics for Nashik district.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#3d5a32",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
