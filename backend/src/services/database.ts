import { Product, ProductCreate } from "../models/product";

export class GetOneResult<T> {
  constructor(private inner: T | null | Error) {}

  public isNotFound(): boolean {
    return this.inner === null || this.inner instanceof Error;
  }

  public unwrap(): T {
    if (this.isNotFound()) throw new Error("Called unwrap on a null value");
    return this.inner as T;
  }
}

export interface Filters extends Partial<Product> {
  order: string;
  sortByPrice?: number;
}

export interface DatabaseRepository {
  getOneProduct(id: string): Promise<GetOneResult<Product>>;

  getProducts(filters?: Filters): Promise<Product[] | Error>;

  createProduct(data: ProductCreate): Promise<void>;

  updateProduct(productToUpdate: Product): Promise<void>;

  deleteProduct(id: string): Promise<void>;
}
