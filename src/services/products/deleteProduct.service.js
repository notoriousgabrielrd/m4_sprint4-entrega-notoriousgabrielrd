

import database from "../../database";

const deletedProductService = async ({ id }) => {

    try {
        const deletedCategory = await database.query(
            "DELETE FROM products WHERE id = $1 RETURNING *",
            [id])

        return deletedCategory.rows[0]
    } catch (err) {
        throw new Error(err)
    }
}

export default deletedProductService