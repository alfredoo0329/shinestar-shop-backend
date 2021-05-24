const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

//configuracion
app.set('port', 3000);
app.use(morgan('dev')); 
app.use(cors());
app.use(express.json());

//rutas
app.use(require('./routes/product_routes'));

//Empezando el servidor
app.listen(app.get('port'));
console.log("ShineStar Shop Server Start");