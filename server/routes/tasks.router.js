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

// Adds a new task into the database
router.post('/', (req, res) => {
    const description = req.body.description;
    const sqlText = `
    INSERT INTO "Tasks"
        ("description") VALUES ($1);
    `;
    pool.query(sqlText, [description]).then(function (sqlResult) {
        res.sendStatus(201);
    }).catch(function (sqlError) {
        console.log(`SQL error in /tasks POST: ${sqlError}`);
        res.sendStatus(500);
    });
});

module.exports = router;