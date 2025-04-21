import { useEffect, useLayoutEffect, useState } from "react";
import { Product, ProductUpdateCreate } from "../types/product";
import { InventoryManager } from "../types/services";

export default function useProducts(
  inventoryManager: InventoryManager,
  setIsLoading: (val: boolean) => void,
) {
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchProducts() {
    setIsLoading(true);
    let fetchedProducts = await inventoryManager.getProducts();

    setIsLoading(false);
    if (fetchedProducts instanceof Error) {
      console.error(fetchedProducts);
    } else {
      setProducts(fetchedProducts);
    }
  }

  async function createProduct(data: ProductUpdateCreate) {
    try {
      await inventoryManager.createProduct(data);
      await fetchProducts();
    } catch (e) {
      console.error(e);
    }
  }

  async function updateProduct(product: Product) {
    await inventoryManager.updateProduct(product);
    await fetchProducts();
  }

  async function deleteProduct(id: string) {
    await inventoryManager.deleteProduct(id);
    await fetchProducts();
  }

  useLayoutEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
