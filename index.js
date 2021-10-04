// Imports
const express = require('express');
const cors = require('cors');

/*-----------------------------------------------------*/
/*-----------------------------------------------------*/

const app =  express(); //Crear servidor
app.use(cors()); //Habilitar cors
require('dotenv').config({path: 'variables.env'}) //Establecer variables de entorno
const PORT = process.env.PORT || 4000; //Puerto de la app
app.use(express.json({ extended: true })); //Habilitar JSON parser  

// Importar rutas
app.use('/api/auth', require('./routes/auth'));


//Definir pagina principal
app.get('/',(req, res) => {
    res.send('Prueba de autenticación');
})

//Arrancar la app
app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running at port ' + PORT);
})