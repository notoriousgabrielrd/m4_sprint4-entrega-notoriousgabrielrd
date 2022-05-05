import database from "../../database";


const listProductIdService = async ({ id }) => {
    try {
        const product = await database.query(
            "SELECT * FROM products WHERE id =$1 ;",
            [id]
        )


        if (product.rows.length == 0) {
            throw new Error("Product not found!")
        }

        return product.rows
    } catch (err) {
        throw new Error(err)
    }

}

export default listProductIdService