import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeuroChat",
  description: "Real-time AI Teaching Platform",
  icons: {
  icon: '/favicon.png',
}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased  bg-[#161B22] `}>
        <ClerkProvider appearance={{variables:{colorPrimary:"#161B22"}}}>
          <NavBar/>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
