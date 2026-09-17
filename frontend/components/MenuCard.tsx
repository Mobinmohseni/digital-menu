import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import { formatPrice } from "@/lib/format";

export function MenuCard({ item }: { item: MenuItem }) {
  return <article className={`group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft ${!item.is_available ? "opacity-80" : ""}`}>
    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">{item.image_url ? <Image src={item.image_url} alt={item.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px" className="object-cover transition duration-500 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-[var(--muted)]"><ImageOff size={28}/></div>}{item.is_featured && <span className="absolute right-3 top-3 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-white">پیشنهاد ویژه</span>}{!item.is_available && <span className="absolute inset-0 grid place-items-center bg-black/40 text-lg font-extrabold text-white">ناموجود</span>}</div>
    <div className="p-4"><div className="flex items-start justify-between gap-3"><h3 className="font-extrabold leading-6">{item.name}</h3><span className="shrink-0 text-sm font-extrabold text-[var(--accent)]">{formatPrice(item.price)}</span></div>{item.description && <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{item.description}</p>}</div>
  </article>;
}
