export interface Product {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  description?: string;
  imageUrl: string;
  quantity: number;
  price: number;
  supplier?: string;
  createdAt?: string;
}

export type ProductUpdateCreate = Omit<Product, "id">;
