export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  sku: string;
  images: string[];
  thumbnail: string;
}

// Wrapper for GET https://dummyjson.com/products
export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
