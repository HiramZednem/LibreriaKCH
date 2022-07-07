/*
    PSEUDO:
    ¿Que es lo que tenemos que hacer para que el programa agregue los libros de mi base de datos?
    -Primero: tenemos que extraer los datos de la base de datos utilizando la conexión que creamos en el otro archivo
    -Segundo: tenemos que enviar todos esos datos a un arbol y regresar un arreglo ordenado de mis datos (PENDIENTE)
    -Tercero: crear una funcion que los agrege todos en el article con id="contenido" que tengo en mi index.

*/
// AQUI EL REQUIRE APLICA DESDE EL HTML QUE ES INVOCADO
const connection = require('../js/crearConexion');

//REFERENCIAS HTML
const article     = document.querySelector('#contenido');
const inputBuscar = document.querySelector('#inputBuscar');


const mostrarLibros = ( libros ) =>{
  //La funcion "mostrarLibros" recibe un arreglo de libros y agrega todos los libros sin ordenar al programa, lo que hay que implementar aqui a futuro, es el ordenamiento de mis libros por medio de un arbol(Se puede hacer por SQL, pero se pide en la rubrica de trabajo la implementación de un arbol)

    //primero borra los datos que tengamos en nuestro article, para evitar cualquier problema
    article.innerHTML = "";
    /*
        Ejemplo de como seria en un futuro:
        let datosOrdenados = arbol.inOrden( _.shuffle(libros) ); 

        Y el for se trabajaria con "datosOrdenados", no con "libros"
      */
    
    for (let i = 0; i < libros.length; i++) {
        let texto =
        `
            <div class="libro">
                <h3>${libros[i].NOMBRE}</h3>
                <img src="../img/libroPlantilla.jpg">
                <span>Carrera: ${libros[i].CARRERA}</span>
                <span>Ubicacion: ${libros[i].UBICACION}</span>                     
                <span>Editorial: ${libros[i].EDITORIAL}</span>
            </div>
        `;

        article.innerHTML += texto;
    }
}
const filtrarCarrera = ( CARRERA ) => {
  //La funcion "filtrarCarrera" recibe la CARRERA y hace un select de los libros con esa carrera y lo envia a "mostrarLibros"
    connection.query(
        `SELECT * FROM LIBRO WHERE CARRERA = "${CARRERA}"; `,
        function(err, results, fields) {
            console.log(err);
            console.log(results);
            mostrarLibros(results);
        }
      );
}
const buscarLibros = () => {
  let textoBuscar = inputBuscar.value;
  
  //Borro los datos del article para ingresar los datos que tengan el mismo nombre
  article.innerHTML = "";

  //SACO TODOS MIS LIBROS
  connection.query( 'SELECT * FROM `LIBRO`', (err, libros, fields) => {
    for (let i = 0; i < libros.length; i++) {
        let texto = '';
        if (libros[i].NOMBRE.toLowerCase().search(textoBuscar.toLowerCase()) != -1) {
          console.log("si");

          let texto =
          `
            <div class="libro">
                <h3>${libros[i].NOMBRE}</h3>
                <img src="../img/libroPlantilla.jpg">
                <span>Carrera: ${libros[i].CARRERA}</span>
                <span>Ubicacion: ${libros[i].UBICACION}</span>                     
                <span>Editorial: ${libros[i].EDITORIAL}</span>
            </div>
          `;

            article.innerHTML += texto;
        }
        console.log('no');
    }
  });
}

//La funcion "iniciarPrograma" inicia el programa.
const iniciarPrograma = () => {
  connection.query( 'SELECT * FROM `LIBRO`', (err, results, fields) => {
    mostrarLibros(results);
  }
);
}
//Se manda a llamar a la funcion iniciarPrograma() para dar comienzo a la pagina
iniciarPrograma();