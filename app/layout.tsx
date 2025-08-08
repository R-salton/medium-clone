import type { Metadata } from "next";
import { Geist, Geist_Mono, Saira, Smooch } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/providers";
import Footer from "@/components/footer";

const saira = Saira({
 variable: "--saira-font",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const smooch = Smooch({
  variable: "--smooch-font",
  weight: ['400'],
  subsets: ["latin"],
  display: "swap",
})


export const metadata: Metadata = {
  title: "Sadev",
  description: "Sadev portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${saira.variable}  antialiased bg-white dark:bg-[#000319]`}
      >
        <ClerkProvider>
          <Providers>
             <Header />
             {children}
             <Footer />
          </Providers>
          
        </ClerkProvider>
       
        {children}
      </body>
    </html>
  );
}
