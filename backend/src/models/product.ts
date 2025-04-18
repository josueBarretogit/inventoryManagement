export class Product {
  constructor(
    public name: string,
    public sku: string,
    public categorId: string,
    public imageUrl: string,
    public quantity: number,
    public price: string,
    public supplier: string,
    public _id?: string,
    public description?: string,
  ) { }
}

export type ProductCreate = Omit<Product, "_id">

