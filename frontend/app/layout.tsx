import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: { default: "منوی دیجیتال | کافه و رستوران", template: "%s | منوی دیجیتال" },
  description: "منوی دیجیتال کافه و رستوران؛ مشاهده نوشیدنی‌ها، غذاها و پیشنهادهای ویژه.",
  keywords: ["منوی دیجیتال", "کافه", "رستوران", "منو", "قهوه"],
  openGraph: { title: "منوی دیجیتال کافه و رستوران", description: "منوی آنلاین کافه و رستوران", type: "website", locale: "fa_IR" },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fa" dir="rtl" suppressHydrationWarning><body><ThemeProvider>{children}</ThemeProvider></body></html>;
}
