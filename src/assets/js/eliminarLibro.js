/* en este script tiene la funcion de buscar y elimnar, solo que aqui se le agrega a la hora de mostrarLibros y buscarLibros, el boton de eliminar */
const connection = require('../js/crearConexion');

//REFERENCIAS HTML
const article     = document.querySelector('#contenido');
const inputBuscar = document.querySelector('#inputBuscar');


const mostrarLibros = ( libros ) =>{
  //La funcion "mostrarLibros" recibe un arreglo de libros y agrega todos los libros sin ordenar al programa, lo que hay que implementar aqui a futuro, es el ordenamiento de mis libros por medio de un arbol(Se puede hacer por SQL, pero se pide en la rubrica de trabajo la implementación de un arbol)

    //primero borra los datos que tengamos en nuestro article, para evitar cualquier problema
    article.innerHTML = "";
    
    for (let i = 0; i < libros.length; i++) {
        let texto =
        `
            <div class="libro">
                <h3>${libros[i].NOMBRE}</h3>
                <img src="../img/libroPlantilla.jpg">
                <span>Carrera: ${libros[i].CARRERA}</span>
                <span>Ubicacion: ${libros[i].UBICACION}</span>                     
                <span>Editorial: ${libros[i].EDITORIAL}</span>
                <button onclick="eliminarLibro('${libros[i].NOMBRE}')" >ELIMINAR</button>   
            </div>
        `;

        article.innerHTML += texto;
    }
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
            <button onclick="eliminarLibro('${libros[i].NOMBRE}')" >ELIMINAR</button>   
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

const eliminarLibro = ( nombre ) => {
    connection.query(`DELETE FROM LIBRO WHERE NOMBRE="${ nombre }";`, (err) => {
        if ( err ){
            console.log("No se pudo borrar el libro");
            console.log(err);
            return;
        }else{ 
            alert ("Libro Borrado");
            location.href = "../views/index.html"
        }
    });
}
//Se manda a llamar a la funcion iniciarPrograma() para dar comienzo a la pagina
iniciarPrograma();