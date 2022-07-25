import connection from "../../database/postgres";

async function checkIfRentalExists(req, res, next) {
    const { id } = req.params;
    try {
        const query = "SELECT 'returnDate FROM rentals WHERE id = $1;";
        const { rows: rental } = await connection.query(query, [id]);
        if(rental.length === 0) {
            return res.sendStatus(404);
        }
        if(rental.returnDate !== null) {
            return res.sendStatus(400);
        }
        next();
    } catch {
        res.sendStatus(500);
    }
}

export default checkIfRentalExists;