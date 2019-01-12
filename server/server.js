const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5006;
const tasksRouter = require('./routes/tasks.router.js');

// Configure server app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));
app.use('/tasks', tasksRouter);

// Start server listening on PORT
app.listen(PORT, () => {
    console.log('listening on port:', PORT);
})