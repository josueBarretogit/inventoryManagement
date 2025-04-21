import { Product } from "../../types/product";
import { SpinnerLoader } from "../loader";
import TableRow from "./tableRow";

export interface ProductTableProps {
  isLoading: boolean;
  onButtonDeleteClick: (id: string) => void;
  onUpdateButtonClick: (product: Product) => void;
  products: Product[];
}

export default function ProductTable({
  products,
  isLoading,
  onButtonDeleteClick,
  onUpdateButtonClick,
}: ProductTableProps) {
  if (isLoading) {
    return <SpinnerLoader />;
  }

  return (
    <table className="w-full text-sm text-left rtl:text-right ">
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

      <tbody>
        {products.length == 0 ? (
          <span>No products found</span>
        ) : (
          products.map((item) => (
            <TableRow
              item={item}
              handleDeleteOnClick={() => onButtonDeleteClick(item.id)}
              onUpdateClick={() => onUpdateButtonClick(item)}
            />
          ))
        )}
      </tbody>
    </table>
  );
}
