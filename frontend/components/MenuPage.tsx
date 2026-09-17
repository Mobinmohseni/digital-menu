"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, RefreshCw, UtensilsCrossed } from "lucide-react";
import type { Category, MenuItem } from "@/types/menu";
import { getCategories, getMenuItems } from "@/lib/api";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryNav } from "@/components/CategoryNav";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedItems } from "@/components/FeaturedItems";
import { MenuSection } from "@/components/MenuSection";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Footer } from "@/components/Footer";

export function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async (signal?: AbortSignal) => {
    try { setCategories(await getCategories(signal)); }
    catch (err) { if (err instanceof DOMException && err.name === "AbortError") return; setError("دریافت دسته‌بندی‌ها انجام نشد."); }
  }, []);

  const loadItems = useCallback(async (category: string | null, signal?: AbortSignal) => {
    setLoading(true); setError(null);
    try { setItems(await getMenuItems(category ?? undefined, signal)); }
    catch (err) { if (err instanceof DOMException && err.name === "AbortError") return; setError("دریافت اطلاعات منو انجام نشد."); }
    finally { if (!signal?.aborted) setLoading(false); }
  }, []);

  useEffect(() => { const controller = new AbortController(); void loadCategories(controller.signal); void loadItems(null, controller.signal); return () => controller.abort(); }, [loadCategories, loadItems]);
  useEffect(() => { if (activeCategory === null) return; const controller = new AbortController(); void loadItems(activeCategory, controller.signal); return () => controller.abort(); }, [activeCategory, loadItems]);

  const chooseCategory = useCallback((slug: string | null) => { setActiveCategory(slug); setSearch(""); if (slug === null) { const controller = new AbortController(); void loadItems(null, controller.signal); } }, [loadItems]);

  const visibleItems = useMemo(() => { const query = search.trim().toLocaleLowerCase("fa-IR"); if (!query) return items; return items.filter(item => `${item.name} ${item.description}`.toLocaleLowerCase("fa-IR").includes(query)); }, [items, search]);
  const grouped = useMemo(() => categories.map(category => ({ category, items: visibleItems.filter(item => item.category.slug === category.slug) })).filter(group => group.items.length), [categories, visibleItems]);
  const featured = useMemo(() => visibleItems.filter(item => item.is_featured), [visibleItems]);

  return <div className="min-h-screen"><Header/><Hero/><CategoryNav categories={categories} active={activeCategory} onSelect={chooseCategory}/><main id="menu" className="mx-auto max-w-6xl px-4 sm:px-6"><div className="py-7"><SearchBar value={search} onChange={setSearch}/></div>{loading ? <LoadingSkeleton/> : error ? <div className="my-10 rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-900 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-200"><AlertCircle className="mx-auto"/><p className="mt-3 font-bold">{error}</p><button onClick={() => loadItems(activeCategory)} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--foreground)] px-4 text-sm font-bold text-[var(--background)]"><RefreshCw size={16}/> تلاش دوباره</button></div> : visibleItems.length === 0 ? <div className="my-10 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-12 text-center"><UtensilsCrossed className="mx-auto text-[var(--muted)]"/><h2 className="mt-4 text-xl font-extrabold">موردی پیدا نشد</h2><p className="mt-2 text-sm text-[var(--muted)]">جستجو یا فیلتر دیگری را امتحان کنید.</p></div> : <><FeaturedItems items={featured}/><div className="space-y-12 pb-12">{grouped.map(({ category, items: groupItems }) => <MenuSection key={category.id} category={category} items={groupItems}/>)}</div></>}</main><Footer/></div>;
}
