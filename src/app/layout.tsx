import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Ketodine AI — Personalized Meal Plans Powered by AI",
  description:
    "Get a personalized meal plan tailored to your goals, preferences, and dietary needs. Powered by advanced AI nutrition science.",
  keywords: ["meal plan", "AI nutrition", "diet plan", "personalized meals", "weight loss", "healthy eating"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-10YVLEFX4F"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-10YVLEFX4F');
          `}
        </Script>
      </body>
    </html>
  );
}
