const { Pool } = require('pg');

const dbConfig = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Guiga123',
    database: 'trabalho-2-DSA',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
};

const pool = new Pool(dbConfig);

module.exports = pool;