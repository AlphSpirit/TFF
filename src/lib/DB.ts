import postgres from "postgres";

const sql = postgres("postgres://postgres@localhost:5432/neonx");

export default sql;