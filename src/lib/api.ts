import { Product, Category } from '@/types';
import mockData from './mock-data.json';

const BASE_URL_1 = 'https://api.api-store.workers.dev/api/bazardor';
const BASE_URL_2 = 'https://api.abcz.workers.dev/api/bazardor';

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const url = category 
      ? `${BASE_URL_1}/products?category=${encodeURIComponent(category)}`
      : `${BASE_URL_1}/products`;
      
    const res = await fetch(url, { 
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(1500)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Try backup URL
    try {
      const url = category 
        ? `${BASE_URL_2}/products?category=${encodeURIComponent(category)}`
        : `${BASE_URL_2}/products`;
      const res = await fetch(url, { 
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(1500)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Ignore and use mock
    }
  }

  // Fallback to local mock data
  const products = (mockData.products as unknown) as Product[];
  if (category) {
    return products.filter(
      p => p.category.toLowerCase() === category.toLowerCase() || p.slug.toLowerCase() === category.toLowerCase()
    );
  }
  return products;
}

export async function getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL_1}/products/${encodeURIComponent(idOrSlug)}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(1500)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    try {
      const res = await fetch(`${BASE_URL_2}/products/${encodeURIComponent(idOrSlug)}`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(1500)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Ignore
    }
  }

  const products = (mockData.products as unknown) as Product[];
  const found = products.find(
    p => String(p.id) === String(idOrSlug) || p.slug === idOrSlug
  );
  return found || null;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE_URL_1}/categories`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(1500)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    try {
      const res = await fetch(`${BASE_URL_2}/categories`, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(1500)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Ignore
    }
  }

  return (mockData.categories as unknown) as Category[];
}
