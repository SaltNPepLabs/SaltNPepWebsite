export interface UpcomingProduct {
  slug: string;
  name: string;
  category: string;
  searchTerms?: string[];
}

// All twenty Aurum previews became products on October 11, 2026.
export const upcomingProducts: UpcomingProduct[] = [];
