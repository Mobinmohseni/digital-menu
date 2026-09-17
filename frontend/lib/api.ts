import type { Category, MenuItem } from "@/types/menu";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:8000/api";

class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); this.name = "ApiError"; }
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { signal, headers: { Accept: "application/json" }, cache: "no-store" });
  if (!response.ok) throw new ApiError(response.status, `API request failed with status ${response.status}`);
  return response.json() as Promise<T>;
}

export function getCategories(signal?: AbortSignal): Promise<Category[]> { return request<Category[]>("/categories/", signal); }
export function getMenuItems(category?: string, signal?: AbortSignal): Promise<MenuItem[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request<MenuItem[]>(`/menu-items/${query}`, signal);
}
export function getCategory(slug: string, signal?: AbortSignal): Promise<Category> { return request<Category>(`/categories/${encodeURIComponent(slug)}/`, signal); }
export function getMenuItem(slug: string, signal?: AbortSignal): Promise<MenuItem> { return request<MenuItem>(`/menu-items/${encodeURIComponent(slug)}/`, signal); }
