import connection from "./../database/postgres.js";


async function getCustomers(req, res) {
    const { cpf } = req.query;
    try {
        const query = !!cpf ? `SELECT * FROM customers WHERE cpf LIKE '${cpf}%';` : "SELECT * FROM customers;";
        const { rows: customers } = await connection.query(query);
        res.send(customers);
    } catch {
        res.sendStatus(500);
    }
}

export { getCustomers };