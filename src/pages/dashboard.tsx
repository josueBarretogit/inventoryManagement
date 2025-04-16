import { ReactNode, useEffect, useState } from "react";
import { Product, ProductUpdateCreate } from "../types/product";
import { InventoryManager } from "../types/services";
import Modal from "../components/modal";
import { SpinnerLoader } from "../components/loader";
import { InputForm, SelectForm } from "../components/inputForm";


interface DashboardProps {
  inventoryManager: InventoryManager;
}

interface TableRowProps {
  item: Product,
  handleDeleteOnClick: () => void
  onUpdateClick: () => void
}


function TableRow({ item, handleDeleteOnClick: handleClick, onUpdateClick }: TableRowProps) {
  return <tr>
    <td>{item.imageUrl}</td>
    <td>{item.name}</td>
    <td>{item.description}</td>
    <td>{item.categoryId}</td>
    <td>{item.quantity}</td>
    <td>{item.sku}</td>
    <td>{item.price}</td>
    <td>{item.supplier}</td>
    <td>
      <div className="flex">
        <button
          onClick={onUpdateClick}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Update
        </button>
        <button
          onClick={handleClick}
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
}

interface CreateProductModalProps {
  onClose: () => void

}

function CreateProductModal({ onClose }: CreateProductModalProps) {
  return <Modal onClose={onClose} >
    <h2 className="p-10">Create product</h2>

    <form className="w-full">

      <div className="mb-10 flex justify-evenly space-x-8">
        <InputForm label="Name" />
        <InputForm label="Sku" />
      </div>

      <div className="mb-10 flex justify-evenly space-x-8">
        <SelectForm label="Category" options={["Electronics", "Accesories"]} />
        <InputForm label="description" />
      </div>


      <div className="mb-10 flex justify-evenly space-x-8">
        <InputForm label="Quantity" type="number" />
        <InputForm label="Price" type="number" />
      </div>

      <div className="mb-10 flex justify-evenly space-x-8">
        <SelectForm label="supplier" options={["Ikea", "Logitech", "KeyChron", "Belkin"]} />
        <InputForm label="Stock" type="number" />
      </div>

      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
    </form>

  </Modal>
}

export default function Dashboard({ inventoryManager }: DashboardProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState<Product>();


  async function fetchProducts() {
    setIsLoading(true);
    let fetchedProducts = await inventoryManager.getProducts();

    setIsLoading(false);
    if (fetchedProducts instanceof Error) {
      console.error(fetchedProducts)
    } else {
      setProducts(fetchedProducts);
    }
  }

  async function createProduct(data: ProductUpdateCreate) {
    await inventoryManager.createProduct(data);
    await fetchProducts()
  }



  async function updateProduct(id: string, data: ProductUpdateCreate) {
    await inventoryManager.updateProduct(id, data)

    await fetchProducts()
  }

  async function deleteProduct(id: string) {
    await inventoryManager.deleteProduct(id)
    await fetchProducts()
  }


  function renderProducts(products: Product[]): ReactNode {
    if (products.length == 0) {
      return <span>No products found</span>;
    }
    return products.map((item) => <TableRow item={item} handleDeleteOnClick={() => deleteProduct(item._id!)} onUpdateClick={() => setIsOpenModalUpdate(true)} />);
  }

  function displayTable(): ReactNode {

    if (isLoading) {
      return <SpinnerLoader />
    }

    return <table className="w-full text-sm text-left rtl:text-right ">
      <thead>
        <tr>
          <th className="px-6 text-xl">Image</th>
          <th className="px-6 text-xl">Name</th>
          <th className="px-6 text-xl">Description</th>
          <th className="px-6 text-xl">Category</th>
          <th className="px-6 text-xl">Stock</th>
          <th className="px-6 text-xl">Identifier</th>
          <th className="px-6 text-xl">Price</th>
          <th className="px-6 text-xl">Supplier</th>
          <th className="px-6 text-xl">Actions</th>
        </tr>
      </thead>

      <tbody>{renderProducts(products)}</tbody>
    </table>
  }


  useEffect(() => {
    fetchProducts();
  }, []);


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

      {isOpenModalCreate &&
        <CreateProductModal onClose={() => setIsOpenModalCreate(false)} />
      }

      {isOpenModalUpdate &&
        <Modal onClose={() => setIsOpenModalUpdate(false)} >
          <h2>the modal update</h2>
        </Modal>
      }


      {displayTable()}
    </>
  );
}
