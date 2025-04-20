import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { DatabaseRepository, Filters, GetOneResult } from "../database";
import { Product, ProductCreate } from "../../models/product";
import { faker } from "@faker-js/faker";

export class MongoDatabase implements DatabaseRepository {
  private db: mongoDB.Db;
  private collectionName = "products";

  constructor(private client: mongoDB.MongoClient) {
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    this.db = db;
  }

  private getProductColl<T extends mongoDB.Document>() {
    return this.db.collection<T>(this.collectionName);
  }

  async getOneProduct(id: string): Promise<GetOneResult<Product>> {
    try {
      let product = await this.getProductColl().findOne({
        _id: new mongoDB.ObjectId(id),
      });

      if (product == null) {
        return new GetOneResult<Product>(null);
      } else {
        return new GetOneResult<Product>({
          id: product._id.toString(),
          name: product["name"],
          description: product["description"],
          categorId: product["categorId"],
          supplier: product["supplier"],
          quantity: product["quantity"],
          price: product["price"],
          imageUrl: product["imageUrl"],
          sku: product["sku"],
        });
      }
    } catch (e) {
      return new GetOneResult<Product>(e as mongoDB.MongoError);
    }
  }

  async getProducts(filters: Filters): Promise<Product[] | Error> {
    try {
      //// DELETE: this
      //await this.db.collection(this.collectionName).insertMany([
      //  {
      //    name: faker.internet.username(),
      //    description: faker.lorem.paragraph(),
      //    categorId: "Mobile",
      //    supplier: "Tigo",
      //    quantity: faker.number.int(),
      //    price: faker.number.int(),
      //    imageUrl: faker.image.url(),
      //    sku: faker.string.uuid(),
      //  }
      //])

      let query: mongoDB.Filter<Product> = {};

      //let options: mongoDB.FindOptions = { sort: filters.order }

      let match: mongoDB.BSON.Document = {};

      const pipeline = [];

      //match.$match = { quantity: { $lt: 400 } }
      //pipeline.push(match)

      if (filters.sku) {
      }

      if (filters.sortByPrice) {
        pipeline.push({ $sort: { price: filters.sortByPrice } });
      }

      pipeline.push({ $limit: 100 });
      //pipeline.push({ $group: { _id: "$price", } })

      let products = await this.getProductColl<Product>()
        .aggregate(pipeline)
        .map((product) => {
          return {
            id: product._id.toString(),
            name: product["name"],
            description: product["description"],
            categorId: product["categorId"],
            supplier: product["supplier"],
            quantity: product["quantity"],
            price: product["price"],
            imageUrl: product["imageUrl"],
            sku: product["sku"],
          };
        })
        .toArray();

      return products;
    } catch (e) {
      return e as mongoDB.MongoError;
    }
  }

  async createProduct(data: ProductCreate): Promise<void> {
    await this.db.collection(this.collectionName).insertOne(data);
  }

  async updateProduct(productToUpdate: Product): Promise<void> {
    await this.db
      .collection(this.collectionName)
      .updateOne(
        { _id: new mongoDB.ObjectId(productToUpdate.id) },
        { $set: productToUpdate },
      );
  }

  async deleteProduct(id: string): Promise<void> {
    await this.db
      .collection(this.collectionName)
      .deleteOne({ _id: new mongoDB.ObjectId(id) });
  }

  static async connectToDatabase(): Promise<mongoDB.MongoClient> {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
      process.env.DB_CONN_STRING as string,
    );

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    await client.db("inventory").command({ ping: 1 });

    console.log(`Successfully connected to database: ${db.databaseName}`);

    return client;
  }

  async close() {
    console.log("Closing db connection");

    await this.client.close();
  }
}
