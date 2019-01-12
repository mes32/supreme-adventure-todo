const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5006;
const tasksRouter = require('./routes/tasks.router.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));
app.use('/tasks', tasksRouter);


app.listen(PORT, () => {
    console.log('listening on port:', PORT);
})