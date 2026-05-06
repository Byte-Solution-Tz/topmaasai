import type { Metadata } from "next";
import "@/app/globals.css";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Top Maasai Mining Co. | Tanzanian Gemstones from Mererani",
    template: "%s | Top Maasai Mining Co.",
  },
  description:
    "Top Maasai Mining Co. is a Tanzania-based gemstone sourcing, mining investment and jewelry production company delivering ethically sourced gemstones from Mererani to global markets.",
  keywords: [
    "Tanzanian gemstones",
    "ethically sourced gemstones",
    "Mererani mining",
    "gemstone suppliers Tanzania",
    "mining investment Africa",
    "rare minerals",
    "gemstone sourcing",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <LoadingScreen />
        <ScrollProgressBar />
        <div className="flex min-h-screen flex-col bg-background">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
