import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../providers"; 

export const metadata: Metadata = {
  title: "Monad Prediction Market",
  description: "Real-time prediction market on Monad Testnet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}