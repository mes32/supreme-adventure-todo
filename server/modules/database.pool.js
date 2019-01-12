const pg = require('pg');

// Configure database connection pool
const pool = new pg.Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000 // 10 seconds
});

module.exports = pool;