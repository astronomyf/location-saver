import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryWrapper from "@/components/query-wrapper";
import ToastProvider from "@/components/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Location Saver",
  description: "Explore and save interesting places from around the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryWrapper>
          <ToastProvider />
          <TooltipProvider delayDuration={100} skipDelayDuration={10}>
            {children}
          </TooltipProvider>
        </QueryWrapper>
      </body>
    </html>
  );
}
