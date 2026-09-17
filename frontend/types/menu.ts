export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: number;
  category: Category;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string | null;
  image_url: string | null;
  is_available: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
