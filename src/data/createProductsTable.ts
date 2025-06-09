import pool from "../config/db";

const createProductsTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        quantity INTEGER NOT NULL,
        price NUMERIC(10, 2),
        description VARCHAR(100)
        )`;

        try {
            pool.query(queryText);
            console.log("Products table created if not exists");
        } catch (error) {
            console.log("Error creating products table",error)
        }
};

export default createProductsTable;