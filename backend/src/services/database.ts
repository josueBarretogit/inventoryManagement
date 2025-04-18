import { Product, ProductCreate } from "../models/product";

export class GetOneResult<T> {
  constructor(private inner: T | null | Error) {

  }

  public isNotFound(): boolean {
    return this.inner === null || this.inner instanceof Error
  }

}

export interface DatabaseRepository {

  getOneProduct(id: string): Promise<GetOneResult<Product>>;

  getProducts(): Promise<Product[] | Error>;

  createProduct(data: ProductCreate): Promise<void>;

  updateProduct(productToUpdate: Product): Promise<void>;

  deleteProduct(id: string): Promise<void>;
}
