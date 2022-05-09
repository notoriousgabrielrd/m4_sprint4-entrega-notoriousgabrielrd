import database from "../../database";


const listProductsService = async () => {

    try {
        const categories = await database.query(
            "SELECT * FROM products;"
        )

        return categories.rows

    } catch (err) {
        throw new Error(err)
    }
}

export default listProductsService