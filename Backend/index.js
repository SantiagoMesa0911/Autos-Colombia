const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { port, urlcors } = require('./config');
const { connection } = require('./config/db');


const app = express();
connection();


app.use(express.json());
app.use(morgan('dev'));



app.listen(port, async () => {
    console.log(`El servidor está corriendo en http://localhost:${port}`);

});

