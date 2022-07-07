const connection = require('../js/crearConexion');

//REFERENCIAS HTML
var txtNombre    = document.getElementById('txtNombre');
var txtEditorial = document.getElementById('txtEditorial');
var txtCarrera   = document.getElementById('txtCarrera');
var txtUbicacion = document.getElementById('txtUbicacion');

const añadirLibro = () =>{
    let nombre    = txtNombre.value;
    console.log(nombre);
    let editorial = txtEditorial.value;
    console.log(editorial);
    let carrera   = txtCarrera.value;
    console.log(carrera);
    let ubicacion = txtUbicacion.value;
    console.log(ubicacion);

    if (  !(nombre == '' || editorial == '' || carrera == '' || ubicacion == '') ) {
        //SE ACTUALIZO LA SENTENCIA SQL YA QUE SE AGREGO UNA ID
        connection.query(`INSERT INTO LIBRO (NOMBRE, CARRERA, EDITORIAL, UBICACION) VALUES ("${nombre}","${carrera}","${editorial}","${ubicacion}");`, (err) => {
            if ( err ){
                console.log("No se pudieron agregar los datos");
                console.log(err);
                return;
            }else{ 
                alert ("Datos guardados");
                location.href = "../views/index.html"
            }
        });
    }else{
        alert("Llene los campos necesarios para continuar");
    }
    
}