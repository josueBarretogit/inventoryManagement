export class Product {
  constructor(
    public name: string,
    public sku: string,
    public categorId: string,
    public imageUrl: string,
    public quantity: number,
    public price: number,
    public supplier: string,
    public id: string,
    public description?: string,
  ) {}
}

export type ProductCreate = Omit<Product, "id">;
