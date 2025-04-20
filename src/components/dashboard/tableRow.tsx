import { Product } from "../../types/product";

export interface TableRowProps {
  item: Product;
  handleDeleteOnClick: () => void;
  onUpdateClick: () => void;
}

export default function TableRow({
  item,
  handleDeleteOnClick: handleClick,
  onUpdateClick,
}: TableRowProps) {
  return (
    <tr>
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
  );
}
