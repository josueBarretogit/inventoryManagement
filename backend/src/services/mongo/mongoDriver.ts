import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { DatabaseRepository, GetOneResult } from "../database";
import { Product, ProductCreate } from "../../models/product";


export class MongoDatabase implements DatabaseRepository {

  private productsCollection: mongoDB.Collection

  constructor(private client: mongoDB.MongoClient) {
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    this.productsCollection = db.collection("products")
  }

  async getOneProduct(id: string): Promise<GetOneResult<Product>> {
    try {

      let product = await this.productsCollection.findOne({ _id: new mongoDB.ObjectId(id) })

      if (product == null) {
        return new GetOneResult<Product>(null)

      } else {
        return new GetOneResult({
          _id: product._id.toString(),
          name: product["name"],
          description: product["description"],
          categorId: product["categorId"],
          supplier: product["supplier"],
          quantity: product["quantity"],
          price: product["price"],
          imageUrl: product["imageUrl"],
          sku: product["sku"],
        })
      }

    } catch (e) {
      return new GetOneResult<Product>(e as mongoDB.MongoError)
    }
  }

  async getProducts(): Promise<Product[] | Error> {
    try {

      let products = await this.productsCollection.find({}).map(pro => {
        return <Product>{
          _id: pro._id.toString(),
          name: pro["name"],
          description: pro["description"],
          categorId: pro["categorId"],
          supplier: pro["supplier"],
          quantity: pro["quantity"],
          price: pro["price"],
          imageUrl: pro["imageUrl"],
          sku: pro["sku"],
        }
      }).toArray()


      return products
    } catch (e) {
      return e as mongoDB.MongoError
    }
  }



  async createProduct(data: ProductCreate): Promise<void> {
    await this.productsCollection.insertOne(data)
  }

  async updateProduct(productToUpdate: Product): Promise<void> {
    await this.productsCollection.updateOne(new mongoDB.ObjectId(productToUpdate._id), { $set: productToUpdate })
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productsCollection.deleteOne({ _id: new mongoDB.ObjectId(id) })
  }

  static async connectToDatabase(): Promise<mongoDB.MongoClient> {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    await client.db("inventory").command({ ping: 1 });

    console.log(`Successfully connected to database: ${db.databaseName}`);

    return client
  }

  async close() {
    console.log("Closing db conn")
    await this.client.close()
  }

}


