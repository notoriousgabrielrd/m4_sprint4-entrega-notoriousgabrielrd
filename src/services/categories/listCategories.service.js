import database from "../../database";


const listCategoriesService = async () => {

    try {
        const categories = await database.query(
            "SELECT * FROM categories;"
        )

        return categories.rows

    } catch (err) {
        throw new Error(err)
    }
}

export default listCategoriesService