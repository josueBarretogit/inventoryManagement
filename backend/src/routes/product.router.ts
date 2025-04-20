import { Request, Response, Router } from "express";
import { DatabaseRepository, Filters } from "../services/database";
import { Product } from "../models/product";

export default class ProductRouter {
  constructor(
    private repository: DatabaseRepository,
    private router: Router,
  ) {}

  getOneProduct(path: string) {
    this.router.get(path, async (req: Request, res: Response) => {
      const { id } = req.params;

      const product = await this.repository.getOneProduct(id);

      res.status(200).send({ ok: `Found product: ${product.unwrap().name}` });
    });
  }

  getProducts(path: string) {
    this.router.get(path, async (req: Request, res: Response) => {
      const { sortByPrice, supplier, name, order, sku, price } = req.query;

      let filters: Filters = {
        order: order?.toString() || "desc",
        sku: sku as string | undefined,
        name: name as string | undefined,
        supplier: supplier as string | undefined,
        price: price ? Number(price) : undefined,
        sortByPrice: sortByPrice ? Number(sortByPrice) : undefined,
      };

      const productsOrError = await this.repository.getProducts(filters);

      if (productsOrError instanceof Error) {
        res
          .status(500)
          .send({ error: `some error ocurred ${productsOrError}` });
      } else {
        res.status(200).send({ products: productsOrError });
      }
    });
  }

  createProducts(path: string) {
    this.router.post(path, async (req: Request, res: Response) => {
      const product = req.body as Product;
      try {
        await this.repository.createProduct(product);
        res.status(200).send({ ok: "creation" });
      } catch (e) {
        res.status(500).send({ error: `An error ocurred: ${e}` });
      }
    });
  }

  updateProduct(path: string) {
    this.router.put(path, async (req: Request, res: Response) => {
      const product = req.body as Product;

      try {
        await this.repository.updateProduct(product);
        res.status(200).send({ ok: "updated" });
      } catch (e) {
        res.status(500).send({ error: `An error ocurred: ${e}` });
      }
    });
  }

  deleteProduct(path: string) {
    this.router.delete(path, async (req: Request, res: Response) => {
      const { id } = req.params;

      try {
        const maybeExists = await this.repository.getOneProduct(id);

        if (maybeExists.isNotFound()) {
          res.status(404).send({ ok: "not found" });
          return;
        }

        await this.repository.deleteProduct(id);

        res.status(200).send({ ok: "deleted" });
      } catch (e) {
        res.status(500).send({ error: `An error ocurred: ${e}` });
      }
    });
  }

  routes() {
    this.getProducts("/");

    this.createProducts("/");

    this.updateProduct("/");

    this.deleteProduct("/:id");

    return this.router;
  }
}
