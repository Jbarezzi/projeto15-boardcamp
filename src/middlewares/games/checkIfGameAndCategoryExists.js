import connection from "../../database/postgres.js";

async function checkIfGameAndCategoryExists(req, res, next) {
    const { categoryId, name } = req.body;
    try {
        const category = await connection.query("SELECT * FROM categories WHERE id = $1;", [categoryId]);
        const game = await connection.query("SELECT * FROM games WHERE name ILIKE $1;", [name]);
        const isCategoryInDB = category.rowCount > 0, 
              isGameInDB = game.rowCount > 0;
        if(isCategoryInDB === false) {
            return res.sendStatus(400);
        }
        if(isGameInDB) {
            return res.sendStatus(409);
        }
        next();
    } catch {
        res.sendStatus(500);
    }
}

export default checkIfGameAndCategoryExists;