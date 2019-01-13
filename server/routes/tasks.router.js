const express = require('express');
const router = express.Router();
const pool = require('../modules/database.pool');

// Returns all tasks currently in the database
router.get('/', (req, res) => {
    const sqlText = `
    SELECT id, description, completed FROM "Tasks"
        ORDER BY completed, insert_timestamp ASC
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

// Mark a task as completed in the database based on database id
router.put('/:id', (req, res) => {
    const taskID = req.params.id;
    const sqlText = `
    UPDATE "Tasks"
        SET "completed" = TRUE
        WHERE "id" = $1;
    `;
    pool.query(sqlText, [taskID]).then(function (sqlResult) {
        res.sendStatus(200);
    }).catch(function (sqlError) {
        console.log(`SQL error in /tasks PUT: ${sqlError}`);
        res.sendStatus(500);
    });
});

// Delete a task in the database based on database id
router.delete('/:id', (req, res) => {
    const taskID = req.params.id;
    const sqlText = `
    DELETE FROM "Tasks"
        WHERE "id" = $1;
    `;
    pool.query(sqlText, [taskID]).then(function (sqlResult) {
        res.sendStatus(200);
    }).catch(function (sqlError) {
        console.log(`SQL error in /tasks DELETE: ${sqlError}`);
        res.sendStatus(500);
    });
});

module.exports = router;