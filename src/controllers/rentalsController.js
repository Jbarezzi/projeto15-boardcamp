import connection from "../database/postgres.js";

async function getRentals(req, res) {
    try {
        const query = `SELECT rentals.*, 
                    json_build_object('id', customers.id, 'name', customers.name) AS customer,
                    json_build_object('id', games.id, 'name', games.name, "categoryId", games."categoryId", 'categoryName', categories.name) AS game
                    FROM rentals
                    JOIN customers ON rentals."customerId" = customers.id
                    JOIN games ON rentals."gameId" = games.id
                    JOIN categories ON games."categoryId" = categories.id`;
        const { rows: rentals } = await connection.query(query);
        res.send(rentals);
    } catch {
        res.sendStatus(500);
    }
}

export { getRentals };