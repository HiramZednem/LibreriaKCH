/*
    AQUI EL REQUIRE APLICA DESDE EL HTML QUE ES INVOCADO
*/
    var conexion = require('../js/crearConexion');


//REFERENCIAS HTML
const article     = document.querySelector('#contenido');
const inputBuscar = document.querySelector('#inputBuscar');

console.log('hola');
/*
    ¿Que es lo que tenemos que hacer para que el programa agregue los libros de mi base de datos?
    -Primero: tenemos que extraer los datos de la base de datos utilizando la conexión que creamos en el otro archivo
    -Segundo: tenemos que enviar todos esos datos a un arbol y regresar un arreglo ordenado de mis datos (PENDIENTE)
    -Tercero: crear una funcion que los agrege todos en el article con id="contenido" que tengo en mi index.

*/