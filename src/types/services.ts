import { Product, ProductUpdateCreate } from "./product";

export interface InventoryManager {
  getProducts(): Promise<Product[] | Error>;

  createProduct(data: ProductUpdateCreate): Promise<void>;

  updateProduct(id: string, data: ProductUpdateCreate): Promise<void>;

  deleteProduct(id: string): Promise<void>;
}
