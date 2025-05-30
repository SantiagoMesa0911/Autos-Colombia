const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { port, urlcors } = require('./Config');
const { connection } = require('./Config/db');

const seedCeldas = require('./Scripts/seedCeldas');

const AuthRoutes = require('./Routes/auth.routes');
const Vehiculo = require('./Routes/vehiculo');
const UsuarioRoutes = require('./Routes/usuario');
const CeldaRoutes = require('./Routes/celda');

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
UsuarioRoutes(app)
CeldaRoutes(app)
AuthRoutes(app);

app.listen(port, async () => {
    const seedResult = await seedCeldas();
    console.log(seedResult.message);
    console.log(`El servidor está corriendo en http://localhost:${port}`);

});

app.get('/', async (req, res) => {
    res.send('API DE AUTOS COLOMBIA')
})