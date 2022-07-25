import connection from "../database/postgres.js";
import dayjs from "dayjs";

async function getRentals(req, res) {
    const { customerId, gameId } = req.query;
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
// TODO: implement query string search

async function createRental(req, res) {
    const rental = req.body,
        pricePerDay = res.locals.pricePerDay,
        newRental = {
            ...rental,
            rentDate: dayjs().format("DD-MM-YYYY"),
            originalPrice: rental.daysRented * pricePerDay,
            returnDate: null,
            delayFee: null,
        },
        query = `INSERT INTO rentals ("delayFee", "returnDate", "originalPrice", "rentDate", "customerId", "gameId", "daysRented") VALUES ($1, $2, $3, $4, $5, $6, $7);`;
        await connection.query(query, [newRental.delayFee, newRental.returnDate, newRental.originalPrice, newRental.rentDate, newRental.customerId, newRental.gameId, newRental.daysRented]);
        res.sendStatus(201);      
}

async function deleteRental(req, res) {
    const { id } = req.params,
        query = "DELETE FROM rentals WHERE id = $1;";
    await connection.query(query, [id]);
    res.sendStatus(200);
}

async function returnRental(req, res) {
    const daysDelayed = res.locals.daysDelayed || 0;
    const { id } = req.params;
    try {
        const query = `SELECT rentals.*, games."pricePerDay" FROM rentals JOIN games ON "gameId" = games.id WHERE rentals.id = $1;`;
        const { rows: rental } = await connection.query(query, [id]);
        const updateQuery = `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;`;
        await connection.query(updateQuery, [dayjs().format("DD-MM-YYYY"), daysDelayed * rental[0].pricePerDay, id]);
        res.sendStatus(200)
    } catch {
        res.sendStatus(500);
    }
}

export { getRentals, createRental, deleteRental, returnRental };