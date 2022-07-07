/*
  El script modificar libro lo que hace es, mostrar todos los libros con un boton añadido que dice "MODIFICAR",
  cuando este boton es pulsado, borra todo el html y agrega un html de ingreso de datos para poder actualziar los datos
*/ 
const connection = require('../js/crearConexion');

//REFERENCIAS HTML
const article     = document.querySelector('#contenido');
const inputBuscar = document.querySelector('#inputBuscar');
const html        = document.querySelector('html')

const mostrarLibros = ( libros ) =>{
  //Aqui añado el boton con la funcion modificarLibro() que nos ayuda a borrar todo lo del html y poder añadir las cosas.
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
                <button onclick="modificarLibro('${libros[i].ID}')" >MODIFICAR</button>   
            </div>
        `;
        //SE CAMBIO LA CONDICION DE ELIMINACIÓN (25) POR EL ID
        article.innerHTML += texto;
    }
}

const buscarLibros = () => {
  //Aqui añado el boton con la funcion modificarLibro() que nos ayuda a borrar todo lo del html y poder añadir las cosas.
  let textoBuscar = inputBuscar.value;
  article.innerHTML = "";
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
            <button onclick="modificarLibro('${libros[i].ID}')" >MODIFICAR</button>   
        </div>
        `;
        //SE CAMBIO LA CONDICION DE ELIMINACIÓN (51) POR EL ID

            article.innerHTML += texto;
        }
        console.log('no');
    }
  });
}

const añadirHTML = () =>{
//ESTA FUNCION AÑADE EL HTML PARA AÑADIR UN LIBRO (ES LO MISMO QUE AÑADIRLIBRO PERO CON ALGUNAS MODIFICACIONES)

  html.innerHTML = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>AÑADIR</title>
      <script src="../js/añadirLibro.js" defer></script>
      
  </head>
  <body>
  
  <button><a href="index.html"> ATRAS </a></button>
  
      <section>
          <legend>Datos del libro:</legend>
          <label>Nombre del libro</label>
          <input type="text" id="txtNombre" required>
          <br/>
          <label>Editorial:</label>
          <input type="text" id=txtEditorial required>
          <br/>
          <label>Carrera</label>
          <select id="txtCarrera" required>
              <option>SOFTWARE</option>
              <option>AMBIENTAL</option>
              <option>ENERGIA</option>
              <option>PYMES</option>
              <option>INGLES</option>
          </select>
          <br/>
          <label>Ubicacion</label>
          <input type="text" id="txtUbicacion">
          <br/>
          <br/>
          <button id="btnModificar"> MODIFICAR </button>     
      </section>
  </body>
  </html>`
}


const modificarLibro = ( idModificar ) => {
  html.innerHTML = "";  
  añadirHTML();
  
  //REFERENCIAS HTML
  const txtNombre    = document.getElementById('txtNombre');
  const txtEditorial = document.getElementById('txtEditorial');
  const txtCarrera   = document.getElementById('txtCarrera');
  const txtUbicacion = document.getElementById('txtUbicacion');
  const btnModificar = document.getElementById('btnModificar');
  
  
  btnModificar.addEventListener('click', () =>{
    let nombre    = txtNombre.value;
    let editorial = txtEditorial.value;
    let carrera   = txtCarrera.value;
    let ubicacion = txtUbicacion.value;
    
    if (  !(nombre == '' || editorial == '' || carrera == '' || ubicacion == '') ) {
      //AQUI ESTA LA SENTENCIA UPDATE
      connection.query(`UPDATE LIBRO SET NOMBRE = "${nombre}", CARRERA="${carrera}", EDITORIAL ="${editorial}", UBICACION="${ubicacion}" WHERE ID = "${idModificar}";`, (err) => {
        //SE CAMBIO LA CONDICION DE ELIMINACIÓN en el query (126) POR EL ID
        if ( err ){
          console.log("No se pudieron modificar los datos");
          console.log(err);
          return;
        }else{ 
          alert ("Datos Actualizados");
          location.href = "../views/index.html"
        }
      });
    }else{
      alert("Llene los campos necesarios para continuar");
    }
    
  });
}



const iniciarPrograma = () => {
  connection.query( 'SELECT * FROM `LIBRO`', (err, results, fields) => {
    mostrarLibros(results);
  }
);
}
//Se manda a llamar a la funcion iniciarPrograma() para dar comienzo a la pagina
iniciarPrograma();