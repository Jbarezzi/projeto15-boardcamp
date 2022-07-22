import connection from "./../database/postgres.js"

async function getGames(req, res) {
    const { name } = req.query;
    try {
        const query = !!name ? `SELECT * FROM games WHERE name ILIKE '${name}%';`: `SELECT * FROM games;`;
        const {rows: games} = await connection.query(query);
        res.send(games);
    } catch {
        res.sendStatus(500);
    }
}

async function createGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',[name,image,stockTotal,categoryId,pricePerDay]);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}

export { getGames, createGame };