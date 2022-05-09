import { Router } from "express";
import CategoriesController from "../controllers/categories.controller";


const categoryRouter = Router()


const categoryController = new CategoriesController()

categoryRouter.post("", categoryController.store)
categoryRouter.get("", categoryController.index)
categoryRouter.get("/:id", categoryController.show)
categoryRouter.patch("/:id", categoryController.update)
categoryRouter.delete("/:id", categoryController.delete)

export default categoryRouter



