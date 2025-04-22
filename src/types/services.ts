import { Product, ProductUpdateCreate } from "./product";

export interface InventoryManager {
  getProducts(): Promise<Product[] | Error>;

  createProduct(data: ProductUpdateCreate): Promise<void>;

  updateProduct(product: Product): Promise<void>;

  deleteProduct(id: string): Promise<void>;
}

export interface Credentials {
  userName: string,
  password: string
}


export interface LoginProvider {
  logIn(credentials: Credentials): Promise<boolean>
}
