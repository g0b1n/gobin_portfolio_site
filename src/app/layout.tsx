import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HomePageWrapper from "./homePageWrapper";

const inter = Inter({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Govinda Dahal Portfolio",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HomePageWrapper>{children}</HomePageWrapper>
      </body>
    </html>
  );
}
