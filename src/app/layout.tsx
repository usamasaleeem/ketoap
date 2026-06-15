import type { Metadata } from "next";
import { Geist } from "next/font/google";
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
      </body>
    </html>
  );
}
