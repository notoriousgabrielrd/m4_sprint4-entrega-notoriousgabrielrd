import database from "../../database";


const listCategoryService = async ({ id }) => {

    try {
        const category = await database.query(
            "SELECT * FROM categories WHERE id =$1 ;",
            [id]
        )


        if (category.rows.length == 0) {
            throw new Error("Category not found!")
        }

        return category.rows
    } catch (err) {
        throw new Error(err)
    }

}

export default listCategoryService