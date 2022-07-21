import connection from "./../database/postgres.js";

async function getCategories(_req, res) {
    try {
        const categories = await connection.query("SELECT * FROM categories;");
        res.send(categories.rows);
    } catch {
        res.sendStatus(500);
    }
}

async function createCategory(req, res) {
    const { name } = req.body;
    try {
        await connection.query("INSERT INTO categories (name) VALUES ($1)", [name]);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}

export { getCategories, createCategory };