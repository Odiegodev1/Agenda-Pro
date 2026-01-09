import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import { Toaster, toast } from 'sonner';
const FontFamily = Sora({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agenda Pro",
icons:{
  icon:"/cor.svg",
}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${FontFamily.className}  antialiased dark`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
