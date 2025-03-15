//Uso del .env
require('dotenv').config();

//Importacion y datos necesarios para Express
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const usuariosRoutes = require('./Routes/Usuarios');
const inventarioRoutes = require('./Routes/Inventario');

//Implementacion de sqlite para almacenar datos

app.use(express.json());

app.use('/', usuariosRoutes);
app.use('/inventario', inventarioRoutes);

app.listen(
    PORT,
    () => console.log(`Está en linea en http://localhost:${PORT}`)
);
