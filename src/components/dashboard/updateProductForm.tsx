import { useActionState } from "react";
import { ProductUpdateCreate } from "../../types/product";
import { InputForm, SelectForm } from "../inputForm";
import Modal from "../modal";

export interface FormValidationError extends Partial<ProductUpdateCreate> {
  errorMessage?: string;
}

export interface UpdateProductModalProps {
  onClose: () => void;
  onCreate: (product: ProductUpdateCreate) => Promise<void>;
}

export default function UpdateProductModalForm({
  onClose,
  onCreate,
}: UpdateProductModalProps) {
  const [possibleErrors, formAction, isPending] = useActionState(
    handleSubmit,
    null,
  );

  function validateData(data: ProductUpdateCreate): FormValidationError | null {
    let errors: FormValidationError | null = {};

    if (data.name.includes("script")) {
      errors.name = "You should not try do that";
    }

    if (data.sku.length < 8) {
      errors.sku = "Should be longer than 8 characteres";
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  async function handleSubmit(_: unknown, data: FormData) {
    let image = data.get("image") as File;

    let newProduct: ProductUpdateCreate = {
      name: data.get("name") as string,
      sku: data.get("sku") as string,
      categoryId: data.get("category") as string,
      description: data.get("description") as string,
      imageUrl: `htpps://${image.name}`,
      quantity: Number(data.get("quantity") as string),
      price: Number(data.get("price") as string),
      supplier: data.get("supplier") as string,
      createdAt: "2025-04-05T14:15:00Z",
    };

    const validationResult = validateData(newProduct);

    if (validationResult == null) {
      await onCreate(newProduct);
    } else {
      return validationResult;
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="p-10">Create product</h2>

      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          formAction(new FormData(e.currentTarget));
        }}
      >
        <div className="mb-10 flex justify-evenly space-x-8">
          <InputForm label="Name" name="name" required />
          {possibleErrors?.name && (
            <span style={{ color: "red" }}>{possibleErrors.name}</span>
          )}
          <InputForm label="Sku" name="sku" required />
          {possibleErrors?.sku && (
            <span style={{ color: "red" }}>{possibleErrors.sku}</span>
          )}
        </div>

        <div className="mb-10 flex justify-evenly space-x-8">
          <SelectForm
            label="Category"
            name="category"
            options={["Electronics", "Accesories"]}
            required
          />
          <InputForm label="description" name="description" required />
        </div>

        <div className="mb-10 flex justify-evenly space-x-8">
          <InputForm label="Quantity" type="number" name="quantity" required />
          <InputForm label="Price" type="number" name="price" required />
        </div>

        <div className="mb-10 flex justify-evenly space-x-8">
          <SelectForm
            label="Supplier"
            name="supplier"
            options={["Ikea", "Logitech", "KeyChron", "Belkin"]}
            required
          />
          <InputForm label="Image" type="file" name="image" required />
        </div>

        {possibleErrors?.errorMessage && (
          <span style={{ color: "red" }}>{possibleErrors.errorMessage}</span>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isPending ? "Loading" : "Create"}{" "}
        </button>
      </form>
    </Modal>
  );
}
