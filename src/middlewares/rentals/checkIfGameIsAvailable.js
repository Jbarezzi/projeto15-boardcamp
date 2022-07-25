import connection from "../../database/postgres";

async function checkIfGameIsAvailable(req, res, next) {
    const { gameId } = req.body;
    try {
        const rentedQuery = `SELECT COUNT("gameId") AS gamesRented FROM rentals WHERE "gameId" = $1;`,
            stockQuery = `SELECT "stockTotal", "pricePerDay" FROM games WHERE id = $1;`,
            { rows: stock } = connection.query(stockQuery, [gameId]),
            { rows: rented } = connection.query(rentedQuery, [gameId]);
        if(stock.length === 0) {
            return res.sendStatus(400);
        }
        if(stock.stockTotal <= rented.gamesRented) {
            return res.sendStatus(400);
        }
        res.locals.price = stock.pricePerDay;
        next();
    } catch {
        res.sendStatus(500);
    }
}

export default checkIfGameIsAvailable;