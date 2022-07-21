import connection from "./../database/postgres.js";

async function getCategories(_req, res) {
    try {
        const categories = await connection.query("SELECT * FROM categories;");
        res.send(categories.rows);
    } catch {
        res.sendStatus(500);
    }
}

export { getCategories };