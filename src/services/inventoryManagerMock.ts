import { Product, ProductUpdateCreate } from "../types/product";
import { InventoryManager } from "../types/services";

function sleepFor(duration: number) {
  return new Promise((res) => {
    setTimeout(() => {
      return res([]);
    }, duration);
  });
}

let products: Product[] = [
  {
    _id: "1",
    name: "Wireless Mouse",
    sku: "MOUSE-001",
    categoryId: "electronics",
    description: "Ergonomic wireless mouse with 2.4GHz connectivity",
    imageUrl: "https://example.com/images/wireless-mouse.jpg",
    quantity: 50,
    price: 19.99,
    supplier: "Logitech",
    createdAt: "2025-04-12T10:30:00Z",
  },
  {
    _id: "2",
    name: "Mechanical Keyboard",
    sku: "KEYB-002",
    categoryId: "electronics",
    description: "RGB backlit mechanical keyboard with blue switches",
    imageUrl: "https://example.com/images/mechanical-keyboard.jpg",
    quantity: 30,
    price: 59.99,
    supplier: "KeyChron",
    createdAt: "2025-04-10T09:00:00Z",
  },
  {
    _id: "3",
    name: "HDMI Cable 1.5m",
    sku: "CABLE-003",
    categoryId: "accessories",
    description: "High-speed HDMI 2.1 cable with gold-plated connectors",
    imageUrl: "https://example.com/images/hdmi-cable.jpg",
    quantity: 100,
    price: 9.49,
    supplier: "Belkin",
    createdAt: "2025-04-05T14:15:00Z",
  },
  {
    _id: "3",
    name: "HDMI Cable 1.5m",
    sku: "CABLE-003",
    categoryId: "accessories",
    description: "High-speed HDMI 2.1 cable with gold-plated connectors",
    imageUrl: "https://example.com/images/hdmi-cable.jpg",
    quantity: 100,
    price: 9.49,
    supplier: "Belkin",
    createdAt: "2025-04-05T14:15:00Z",
  },
  {
    _id: "4",
    name: "HDMI Cable 1.5m",
    sku: "CABLE-003",
    categoryId: "accessories",
    description: "High-speed HDMI 2.1 cable with gold-plated connectors",
    imageUrl: "https://example.com/images/hdmi-cable.jpg",
    quantity: 100,
    price: 9.49,
    supplier: "Belkin",
    createdAt: "2025-04-05T14:15:00Z",
  },
  {
    _id: "5",
    name: "HDMI Cable 1.5m",
    sku: "CABLE-003",
    categoryId: "accessories",
    description: "High-speed HDMI 2.1 cable with gold-plated connectors",
    imageUrl: "https://example.com/images/hdmi-cable.jpg",
    quantity: 100,
    price: 9.49,
    supplier: "Belkin",
    createdAt: "2025-04-05T14:15:00Z",
  },
  {
    _id: "6",
    name: "HDMI Cable 1.5m",
    sku: "CABLE-003",
    categoryId: "accessories",
    description: "High-speed HDMI 2.1 cable with gold-plated connectors",
    imageUrl: "https://example.com/images/hdmi-cable.jpg",
    quantity: 100,
    price: 9.49,
    supplier: "Belkin",
    createdAt: "2025-04-05T14:15:00Z",
  },
  {
    _id: "7",
    name: "HDMI Cable 1.5m",
    sku: "CABLE-003",
    categoryId: "accessories",
    description: "High-speed HDMI 2.1 cable with gold-plated connectors",
    imageUrl: "https://example.com/images/hdmi-cable.jpg",
    quantity: 100,
    price: 9.49,
    supplier: "Belkin",
    createdAt: "2025-04-05T14:15:00Z",
  },
  {
    _id: "8",
    name: "HDMI Cable 1.5m",
    sku: "CABLE-003",
    categoryId: "accessories",
    description: "High-speed HDMI 2.1 cable with gold-plated connectors",
    imageUrl: "https://example.com/images/hdmi-cable.jpg",
    quantity: 100,
    price: 9.49,
    supplier: "Belkin",
    createdAt: "2025-04-05T14:15:00Z",
  },
]

export default class InventoryManagerMock implements InventoryManager {

  async getProducts(): Promise<Product[] | Error> {
    try {
      await sleepFor(500);
      return products;
    } catch (e) {
      return new Error(`an error ocurred: ${e}`)
    }
  }

  async createProduct(data: ProductUpdateCreate): Promise<void> {
    await sleepFor(500);
    products.push({ _id: Math.random().toString(), ...data })
  }

  async updateProduct(id: string, data: Omit<Product, "_id">): Promise<void> {
    let index = products.findIndex(product => product._id == id);

    if (index == -1) {
      return
    }

    products[index] = {
      _id: id,
      ...data
    }

  }

  async deleteProduct(id: string): Promise<void> {
    products = products.filter((prod) => prod._id != id);
  }

}
