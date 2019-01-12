const express = require('express');
const router = express.Router();
const pool = require('../modules/database.pool');

// Returns all tasks currently in the database
router.get('/', (req, res) => {
    const sqlText = `
    SELECT "id", "description", "completed" FROM "Tasks"
    LIMIT 100;
    `;
    pool.query(sqlText).then(function (sqlResult) {
        res.send(sqlResult.rows);
    }).catch(function (sqlError) {
        console.log(`SQL error in /tasks GET: ${sqlError}`);
        res.sendStatus(500);
    });
});

module.exports = router;