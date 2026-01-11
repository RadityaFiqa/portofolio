import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import QueryProvider from "@/helper/providers/QueryProvider";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raditya Firman Syaputra",
  description: "Personal website of Raditya Firman Syaputra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <NavBar />
            {children}
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
