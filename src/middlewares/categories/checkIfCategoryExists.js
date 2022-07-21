import connection from "../../database/postgres.js";

async function checkIfCategoryExists(req, res, next) {
    const { name } = req.body;
    try {
        const categoryExists = await connection.query("SELECT * FROM categories WHERE name = $1;", [name]);
        if(categoryExists) {
            res.sendStatus(409);
        }
        next();
    } catch {
        res.sendStatus(500);
    }
}

export default checkIfCategoryExists;