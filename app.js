//Requires

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//inicializar variables
var app = express();


//body parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Importar rutas

var appRoutes = require('./routes/app');
var usuariosRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
//Rutas
app.use('/usuario', usuariosRoutes);
app.use('/login', loginRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/', appRoutes);


//Conexion base de datos

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;

    console.log('Base de datos:\x1b[32m%s\x1b[0m', ' online');
})



// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000:\x1b[32m%s\x1b[0m', ' online');
});