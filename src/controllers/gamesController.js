import connection from "./../database/postgres.js"

async function getGames(_req, res) {
    // TODO: create search with query string
    try {
        const games = await connection.query("SELECT * FROM games;");
        res.send(games.rows);
    } catch {
        res.sendStatus(500);
    }
}

async function createGame(req, res) {
    // TODO: fix insert
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        await connection.query("INSERT INTO categories (name,image,stockTotal,categoryId,pricePerDay) VALUES ($1,$2,$3,$4,$5)", [name], [image], [stockTotal], [categoryId], [pricePerDay]);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}

export { getGames, createGame };