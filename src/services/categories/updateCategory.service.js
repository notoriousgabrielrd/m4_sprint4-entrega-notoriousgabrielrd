import database from "../../database";


const updateCategoryService = async ({ name, id }) => {

    try {
        const updatedCategory = await database.query("UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
            [name, id])
        return updatedCategory.rows[0]
    } catch (err) {
        throw new Error(err)
    }

}

export default updateCategoryService