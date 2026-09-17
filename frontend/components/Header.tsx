"use client";
import { Coffee, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  return <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight" aria-label="بازگشت به ابتدای منو"><span className="grid size-9 place-items-center rounded-xl bg-[var(--accent)] text-white"><Coffee size={20}/></span><span>کافه‌خانه</span></a>
      <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--muted)] sm:flex" aria-label="ناوبری اصلی"><a href="#menu" className="transition hover:text-[var(--foreground)]">منو</a><a href="#featured" className="transition hover:text-[var(--foreground)]">پیشنهاد ویژه</a><a href="#about" className="transition hover:text-[var(--foreground)]">درباره ما</a></nav>
      <button onClick={toggleTheme} className="grid size-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--card)] transition hover:-translate-y-0.5" aria-label={theme === "dark" ? "فعال کردن حالت روشن" : "فعال کردن حالت تاریک"}>{theme === "dark" ? <Sun size={19}/> : <Moon size={19}/>}</button>
    </div>
  </header>;
}
