import connection from "../../database/postgres";

async function checkIfRentalIsDelayed(req, res, next) {
    const { id } = req.params;
    try {
        const query = "SELECT * FROM rentals WHERE id = '$1';";
        const { rows: rental } = await connection.query(query, [id]);
        
    }
}

export default checkIfRentalIsDelayed;