import pg from "pg";

const { Pool } = pg;

const connection = new Pool ({
    user: "juan",
    password: "0605",
    host: "localhost",
    port: "5432",
    database: "boardcamp",
});

export default connection;