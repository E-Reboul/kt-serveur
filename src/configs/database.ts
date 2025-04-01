import mariadb, { Pool } from 'mariadb';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const DB_HOST: string = process.env.DB_HOST || "localhost";
const DB_USER: string | undefined = process.env.DB_USER;
const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
const DB_NAME: string | undefined = process.env.DB_NAME;
const DB_PORT: number | undefined = parseInt(process.env.DB_PORT || '', 10);

//Configuration de la connexion à la base de données
const pool: Pool = mariadb.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    bigIntAsNumber: true

});

export async function testDirectConnection(): Promise<void> {
    try {
        console.log("Testing direct connection to the database...");
        const connection = await mariadb.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            port: DB_PORT
        });
        console.log("Direct connection successful. Pinging database...");
        await connection.ping();
        console.log("Ping successful");
        connection.end();
    } catch (e) {
        console.error("Direct connection failed:", e);
    }
}

export default pool;