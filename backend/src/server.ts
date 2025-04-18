import express from 'express'
import ProductRouter from "./routes/product.router";
import { MongoDatabase } from "./services/mongo/mongoDriver";
import bodyParser from 'body-parser';

export default class Server {
        static async startServer() {
                let client = await MongoDatabase.connectToDatabase()

                const db = new MongoDatabase(client)

                const router = new ProductRouter(db, express.Router())

                const app = express()

                app.use(express.json())
                app.use(bodyParser.urlencoded({ extended: true }))

                app.use("/product", router.routes())

                app.listen(3000, () => console.log("listening on port : 3000"))
        }
}


