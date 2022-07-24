import connection from "../../database/postgres";

async function checkIfGameIsAvailable(req, res, next) {
    const { gamerId } = req.body;
    try {
        const query = `SELECT COUNT(rentals."gamerId") AS gamesRented, games."stockTotal"`
    } catch {
        res.sendStatus(500);
    }
}

export default checkIfGameIsAvailable;