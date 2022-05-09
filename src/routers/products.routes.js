import { Router } from "express";
import ProductsController from "../controllers/products.controller";


const productsRouter = Router()



const productController = new ProductsController()



productsRouter.post("", productController.store)
productsRouter.get("", productController.index)
productsRouter.get("/:id", productController.show)
productsRouter.patch("/:id", productController.update)
productsRouter.delete("/:id", productController.delete)


productsRouter.get("/category/:id", productController.getJoinId)

export default productsRouter