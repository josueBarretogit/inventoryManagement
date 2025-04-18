import { Request, Response, Router } from "express"
import { DatabaseRepository } from "../services/database"
import { Product } from "../models/product"



export default class ProductRouter {
  constructor(private repository: DatabaseRepository, private router: Router) { }

  getProducts(path: string) {
    this.router.get(path, async (_req: Request, res: Response) => {
      const productsorErr = await this.repository.getProducts()

      if (productsorErr instanceof Error) {
        res.status(500).send({ error: `some error ocurred ${productsorErr}` })
      } else {
        res.status(200).send({ products: productsorErr })
      }

    })

  }

  createProducts(path: string) {

    this.router.post(path, async (req: Request, res: Response) => {
      const product = req.body as Product
      try {
        await this.repository.createProduct(product)
        res.status(200).send({ ok: "creation" })
      } catch (e) {

        res.status(500).send({ error: `An error ocurred: ${e}` })
      }
    })

  }

  updateProduct(path: string) {

    this.router.put(path, async (req: Request, res: Response) => {
      const product = req.body as Product

      try {
        await this.repository.updateProduct(product)
        res.status(200).send({ ok: "updated" })
      } catch (e) {

        res.status(500).send({ error: `An error ocurred: ${e}` })
      }
    })

  }

  deleteProduct(path: string) {

    this.router.delete(path, async (req: Request, res: Response) => {
      const { id } = req.params

      try {

        const exists = await this.repository.getOneProduct(id)

        if (exists.isNotFound()) {
          res.status(404).send({ ok: "not found" })
          return
        }

        await this.repository.deleteProduct(id)

        res.status(200).send({ ok: "deleted" })

      } catch (e) {

        res.status(500).send({ error: `An error ocurred: ${e}` })
      }
    })

  }

  routes() {
    this.getProducts("/")

    this.createProducts("/")

    this.updateProduct("/")

    this.deleteProduct("/:id")

    return this.router
  }
}


