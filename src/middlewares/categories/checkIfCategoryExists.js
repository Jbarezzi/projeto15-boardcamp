import connection from "../../database/postgres.js";

async function checkIfCategoryExists(req, res, next) {
    const { name } = req.body;
    try {
        const category = await connection.query("SELECT * FROM categories WHERE name ILIKE $1;", [name]);
        const isCategoryInDB = category.rowCount > 0;
        if(isCategoryInDB) {
            return res.sendStatus(409);
        }
        next();
    } catch {
        res.sendStatus(500);
    }
}

export default checkIfCategoryExists;