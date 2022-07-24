import connection from "./../database/postgres.js";

async function getCategories(_req, res) {
    try {
        const query = "SELECT * FROM categories;";
        const { rows: categories } = await connection.query(query);
        res.send(categories);
    } catch {
        res.sendStatus(500);
    }
}

function createCategory(req, res) {
    const { name } = req.body;
    try {
        const query = `"INSERT INTO categories (name) VALUES ($1);", ${[name]}`;
        connection.query(query);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}

export { getCategories, createCategory };