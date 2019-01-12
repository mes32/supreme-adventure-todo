const express = require('express');
const router = express.Router();
const pg = require('pg');

// Rename database connection pool class from pg
const Pool = pg.Pool;

// Configure database connection pool
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000 // 10 seconds
});

router.get('/', (req, res) => {
    console.log(`--- In /tasks GET`);
    const sqlText = `
    SELECT "id", "description", "completed" FROM "Tasks"
    LIMIT 100;
    `;
    pool.query(sqlText).then(function (sqlResult) {
        console.log(sqlResult);
        res.send(sqlResult.rows);
    }).catch(function (sqlError) {
        console.log(`SQL error in /tasks GET: ${sqlError}`);
        res.sendStatus(500);
    });
});

module.exports = router;