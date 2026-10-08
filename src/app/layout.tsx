import type { Metadata, Viewport } from "next";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "PulseDesk — Personalized Content Dashboard | SDE Frontend Platform",
  description:
    "Interactive personalized content dashboard aggregating news, media recommendations, and social feeds with drag-and-drop reordering, debounced search, dark mode, and reading analytics.",
  keywords: [
    "Next.js",
    "React",
    "Redux Toolkit",
    "Personalized Dashboard",
    "Frontend Engineering",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "SDE Candidate" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
