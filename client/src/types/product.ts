export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  colors: string[];
  brand: string;
  featured: boolean;
  stock: number;
  freeShipping: boolean;
  userRating: number;
  user: string;
  createdAt: string;
  updatedAt: string;
}
