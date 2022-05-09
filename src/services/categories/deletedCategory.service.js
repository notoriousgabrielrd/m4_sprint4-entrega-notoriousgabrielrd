import { del } from "express/lib/application";
import database from "../../database";

const deletedCategoryService = async ({ id }) => {

    try {
        const deletedCategory = await database.query(
            "DELETE FROM categories WHERE id = $1 RETURNING *",
            [id])

        return deletedCategory.rows[0]
    } catch (err) {
        throw new Error(err)
    }
}

export default deletedCategoryService