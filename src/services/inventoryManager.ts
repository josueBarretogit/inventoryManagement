import axios, { Axios } from "axios";
import { Product, ProductUpdateCreate } from "../types/product";
import { InventoryManager } from "../types/services";

export default class ApiInventoryManager implements InventoryManager {
  private apiClient: Axios;

  constructor(baseUrl: string) {
    this.apiClient = axios.create({
      baseURL: baseUrl,
      timeout: 1000,
    });
  }

  async getProducts(): Promise<Product[] | Error> {
    try {
      const response = await this.apiClient.get(`/product`);

      if (response.data.products === undefined) {
        return [];
      }

      const products = response.data.products;

      return products;
    } catch (e) {
      return new Error(`an error ocurred: ${e}`);
    }
  }

  async createProduct(data: ProductUpdateCreate): Promise<void> {
    try {
      const response = await this.apiClient.post("/product", data);

      if (response.status != 200) {
        console.error(response.status);
        console.error("some error ocurred");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async updateProduct(product: Product): Promise<void> {
    try {
      const response = await this.apiClient.put("/product", product);

      if (response.status != 200) {
        console.error(response.status);
        console.error("some error ocurred");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const response = await this.apiClient.delete(`/product/${id}`);
      if (response.status != 200) {
        console.error(response.status);
        console.error("some error ocurred");
      }
    } catch (e) {
      console.error(e);
    }
  }
}
