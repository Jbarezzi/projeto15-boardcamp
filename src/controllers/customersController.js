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

async function getCustomersById(req, res) {
    const id = req.params.id;
    try {
        const query = `SELECT * FROM customers WHERE id = '${id}'`;
        const { rows: customer } = await connection.query(query);
        if(!!customer) {
            return res.sendStatus(404);
        }
        res.send(customer);
    } catch {
        res.sendStatus(500);
    }
}

export { getCustomers, getCustomersById };