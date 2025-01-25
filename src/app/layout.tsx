import type { Metadata } from "next";
import "./globals.css";
import '@mantine/core/styles.css';
import { Noto_Sans_JP } from "next/font/google";
import { MantineProvider} from '@mantine/core';
import Header from "./components/Header";
import { NextAuthProvider } from "@/lib/NextAuthProvider";


const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: "MuseMatch",
  description: "Let's find your music partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`${notoSansJP.variable}`} suppressHydrationWarning>
          <MantineProvider>
            <NextAuthProvider>
              <Header />
              {children}
            </NextAuthProvider>
          </MantineProvider>
      </body>
    </html>
  );
}
