import connection from "../../database/postgres";

async function checkIfRentalIsDelayed(req, res, next) {
    const { id } = req.params;
    try {
        const query = "SELECT 'daysRented', 'rentDate' FROM rentals WHERE id = '$1';";
        const { rows: { daysRented, rentDate } } = await connection.query(query, [id]);
        const dateToReturn = dayjs(rentDate).add(daysRented, "days");
        const daysDelayed = dayjs().dayOfYear() - dayjs(dateToReturn).dayOfYear();
        if(daysDelayed > 0) {
            res.locals.daysDelayed = daysDelayed;
            return next();
        }
        next();
    } catch {
        res.sendStatus(500);
    }
}

export default checkIfRentalIsDelayed;