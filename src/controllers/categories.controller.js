import createCategoryService from "../services/categories/createCategory.service"
import deletedCategoryService from "../services/categories/deletedCategory.service"
import listCategoriesService from "../services/categories/listCategories.service"
import listCategoryService from "../services/categories/oneCategory.service"
import updateCategoryService from "../services/categories/updateCategory.service"


export default class CategoriesController {

    // criar
    async store(req, res) {

        const { name } = req.body

        try {

            const newCategory = await createCategoryService(name)

            return res.status(201).json(newCategory)
        } catch (err) {

            return res.status(400).json(err.message)

        }

    }

    // listar
    async index(req, res) {
        try {
            const allCategories = await listCategoriesService()
            return res.status(200).json(allCategories)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    // buscar
    async show(req, res) {
        try {
            const { id } = req.params

            const category = await listCategoryService({ id })
            return res.json(category)
        } catch (err) {
            return res.status(400).json(err.message)
        }


    }

    // atualizar
    async update(req, res) {
        try {
            const { id } = req.params
            const { name } = req.body

            const updatedCategory = await updateCategoryService({ name, id })

            return res.json(updatedCategory)

        } catch (err) {
            return res.status(400).json(err.message)
        }

    }

    // delete
    async delete(req, res) {
        try {
            const { id } = req.params
            const deletedCategory = await deletedCategoryService({ id })
            return res.json(deletedCategory)
        } catch (err) {
            return res.status(400).json(err.message)
        }

    }


}