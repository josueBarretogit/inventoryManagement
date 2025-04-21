import React, { useMemo, useState } from "react";
import { Product } from "../types/product";
import { InventoryManager } from "../types/services";
import CreateProductModalForm from "../components/dashboard/createProductForm";
import useProducts from "../hooks/products";
import ProductTable from "../components/dashboard/ProductTable";
import UpdateProductModalForm from "../components/dashboard/updateProductForm";

interface DashboardProps {
  inventoryManager: InventoryManager;
}

class Bad extends React.Component {
  componentDidMount(): void {}

  shouldComponentUpdate(
    nextProps: Readonly<{}>,
    nextState: Readonly<{}>,
    nextContext: any,
  ): boolean {
    // Only re-render if the favoriteFood state has changed
    //return this.state.favoriteFood !== nextState.favoriteFood;
    return false;
  }

  /// On unmount
  componentWillUnmount(): void {}

  render(): React.ReactNode {
    return <h1></h1>;
  }
}

export default function Dashboard({ inventoryManager }: DashboardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  const { products, createProduct, updateProduct, deleteProduct } = useProducts(
    inventoryManager,
    setIsLoading,
  );

  const [productToUpdate, setProductToUpdate] = useState<Product>();

  return (
    <>
      <div className="flex justify-evenly">
        <h1 className="text-lg font-semibold p-2">
          Inventory management dashboard
        </h1>
        <button
          onClick={() => setIsOpenModalCreate(true)}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create
        </button>
      </div>

      {isOpenModalCreate && (
        <CreateProductModalForm
          onClose={() => setIsOpenModalCreate(false)}
          onCreate={async (data) => {
            await createProduct(data);
            setIsOpenModalCreate(false);
          }}
        />
      )}

      {isOpenModalUpdate && (
        <UpdateProductModalForm
          productToUpdate={productToUpdate as Product}
          onClose={() => setIsOpenModalUpdate(false)}
          update={async (data) => {
            await updateProduct(data);
            setIsOpenModalUpdate(false);
          }}
        />
      )}

      <ProductTable
        products={products}
        onButtonDeleteClick={(id) => deleteProduct(id)}
        onUpdateButtonClick={(product) => {
          setIsOpenModalUpdate(true);
          setProductToUpdate(product);
        }}
        isLoading={isLoading}
      />
    </>
  );
}
