import connection from "../../database/postgres.js";

async function checkIfCustomerIsValid(req, res, next) {
    const { customerId } = req.body;
    try {
        const customer = await connection.query("SELECT * FROM customers WHERE id = $1;", [customerId]);
        const isCustomerInDB = customer.rowCount > 0;
        if(isCustomerInDB) {
            return next();
        }
        res.sendStatus(400);
    } catch {
        res.sendStatus(500);
    }
}

export default checkIfCustomerIsValid;