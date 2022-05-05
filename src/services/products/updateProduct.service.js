import database from "../../database";


const updateProductService = async ({ name, price, category_id, id }) => {
    try {
        const updatedProduct = await database.query(
            "UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *",
            [name, price, category_id, id])
        return updatedProduct.rows[0]
    } catch (err) {
        throw new Error(err)
    }

}

export default updateProductService


