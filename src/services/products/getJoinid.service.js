import database from "../../database";


const getJoinIdService = async ({ id }) => {

    try {
        const product = await database.query(
            "SELECT p.name, p.price, c.name as category_name FROM categories c JOIN products p ON p.category_id = c.id WHERE c.id = $1",
            [id]
        )


        if (product.rows.length == 0) {
            throw new Error("product not found!")
        }
        return product.rows
    } catch (err) {
        throw new Error(err)
    }

}

export default getJoinIdService

