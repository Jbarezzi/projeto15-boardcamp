import pg from "pg";

const { Pool } = pg;

const connection = new Pool ({
    user: "",
    password: "",
    host: "localhost",
    port: "5432",
    database: "boardcamp",
});

export default connection;
