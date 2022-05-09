import database from "../../database";


const updateProductService = async (toUpdateInfo, id) => {

    const productOnData = await database.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
    )

    const product = productOnData.rows[0]
    const toUpdate = { ...productOnData.rows[0], ...product }

    const { name, price, category_id } = toUpdate

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


