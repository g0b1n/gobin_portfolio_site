import { Inter } from "next/font/google";
import SessionProviderWrapper from "@/app/SessionProviderWrapper";
import "./globals.css";
import HomePageWrapper from "@/app/homePageWrapper";
import { DarkModeProvider } from "@/context/DarkModeContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DarkModeProvider>
          <SessionProviderWrapper>
            <HomePageWrapper>{children}</HomePageWrapper>
          </SessionProviderWrapper>
        </DarkModeProvider>
      </body>
    </html>
  );
}
