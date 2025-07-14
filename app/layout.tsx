import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { DataProvider } from "@/providers/data-provider";
import localFont from "next/font/local";
import { ConfirmDialogProvider } from "@/providers/confirm-dialog-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const appName = process.env.NEXT_PUBLIC_APP_NAME || "P-Core";
const appDescription =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "P-Core - A powerful user management platform";

export const metadata: Metadata = {
  title: appName,
  description: appDescription,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <Sonner />
              <Toaster />
              <DataProvider>
                <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
              </DataProvider>
            </QueryProvider>
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
