import createProductService from "../services/products/createProducts.service"
import deletedProductService from "../services/products/deleteProduct.service"
import getJoinIdService from "../services/products/getJoinid.service"
import listProductIdService from "../services/products/listProductid.service"
import listProductsService from "../services/products/listProductsService.service"
import updateProductService from "../services/products/updateProduct.service"




export default class ProductsController {

    // criar
    async store(req, res) {

        const { name, price, category_id } = req.body

        try {

            const newProduct = await createProductService({ name, price, category_id })

            return res.status(201).json(
                {
                    message: "created",
                    product: newProduct
                }
            )
        } catch (err) {

            return res.status(400).json({
                message: err.message
            })

        }

    }

    // listar
    async index(req, res) {
        try {
            const allProducts = await listProductsService()
            return res.status(200).json(allProducts)
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }

    // buscar
    async show(req, res) {
        try {
            const { id } = req.params

            const product = await listProductIdService({ id })
            return res.json(
                {
                    name: "Produto Teste",
                    product
                }
            )
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }


    }

    // atualizar
    async update(req, res) {
        try {
            const { id } = req.params
            const { name, price, category_id } = req.body

            const updatedProduct = await updateProductService({ name, price, category_id, id })

            return res.status(200).json({
                message: "updated",
                updatedProduct,
                product: {
                    name: "Atualizado"

                }
            })

        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }

    }

    // delete
    async delete(req, res) {
        try {
            const { id } = req.params
            const deletedProduct = await deletedProductService({ id })
            return res.status(200).json({
                message: "deleted",
                product: [deletedProduct]
            })
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }

    }

    async getJoinId(req, res) {
        try {
            const { id } = req.params
            const getJoinId = await getJoinIdService({ id })
            return res.status(200).json([{ category: getJoinId }])


        } catch (err) {
            return res.status(400).json(err.message)

        }
    }



}