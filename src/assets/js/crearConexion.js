/* EN ESTE ARCHIVO SE CREA LA CONEXION A LA BASE DE DATOS */


const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'test'
});


//Verificación de conexión
connection.connect( ( err ) => {
    if ( err ){
        console.log( err.code );
        console.log( err.fatal );
    }else{
        console.log('conexión exitosa');
    }
});

module.exports = connection;