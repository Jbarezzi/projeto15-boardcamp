import connection from "./../database/postgres.js";


async function getCustomers(req, res) {
    const { cpf } = req.query;
    try {
        const query = !!cpf ? `SELECT * FROM customers WHERE cpf LIKE '$1%';` : "SELECT * FROM customers;";
        const { rows: customers } = await connection.query(query, !!cpf ? [cpf] : null);
        res.send(customers);
    } catch {
        res.sendStatus(500);
    }
}

async function getCustomersById(req, res) {
    const id = req.params.id;
    try {
        const query = "SELECT * FROM customers WHERE id = '$1';";
        const { rows: customer } = await connection.query(query, [id]);
        if(!!customer) {
            return res.sendStatus(404);
        }
        res.send(customer);
    } catch {
        res.sendStatus(500);
    }
}

function createCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        const query = ('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)', [name, phone, cpf, birthday]);
        connection.query(query);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}

function updateCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const id = req.params.id;
    try {
        const query = ("UPDATE customers SET (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4) WHERE id = '$5'", [name, phone, cpf, birthday, id]);
        connection.query(query);
        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
}

export { getCustomers, getCustomersById, createCustomer, updateCustomer };