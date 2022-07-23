import connection from "../../database/postgres.js";

async function checkIfCustomerExists(req, res, next) {
    const { cpf } = req.body;
    try {
        const customer = await connection.query("SELECT * FROM customers WHERE cpf = $1;", [cpf]);
        const isCustomerInDB = customer.rowCount > 0;
        if(isCustomerInDB) {
            return res.sendStatus(409);
        }
        next();
    } catch {
        res.sendStatus(500);
    }
}

export default checkIfCustomerExists;