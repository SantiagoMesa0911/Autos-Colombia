const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { port, urlcors } = require('./Config');
const { connection } = require('./Config/db');

const Vehiculo = require('./Routes/vehiculo');

const app = express();
connection();

// Configuración de CORS
const corsOptions = {
    origin: urlcors,
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));


Vehiculo(app)

app.listen(port, async () => {
    console.log(`El servidor está corriendo en http://localhost:${port}`);

});

app.get('/', async (req, res) => {
    res.send('API DE AUTOS COLOMBIA')
})