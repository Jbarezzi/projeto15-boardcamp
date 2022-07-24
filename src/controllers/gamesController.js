import connection from "./../database/postgres.js"

async function getGames(req, res) {
    const { name } = req.query;
    try {
        const filter = !!name ? "WHERE games.name ILIKE $1;" : ";";
        // TODO: fix filter
        const query = `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON categories.id = "categoryId" ${filter}`;
        const {rows: games} = await connection.query(query);
        res.send(games);
    } catch {
        res.sendStatus(500);
    }
}

async function createGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        const query = `INSERT INTO games 
            (name, image, "stockTotal", "categoryId", "pricePerDay") 
            VALUES ($1, $2, $3, $4, $5);`
        connection.query(query, [name,image,stockTotal,categoryId,pricePerDay]);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}

export { getGames, createGame };