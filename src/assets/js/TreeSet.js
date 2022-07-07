/*
    Pseudo:
    Todo va a estar en una funcion que se llame inOrden que se va a encargar de ordenar todo,
    esta funcion recibe un arreglo de objetos.

    La Key = libro.ID
    Contenido de Arbol = libro;

    1. Se recibe un arreglo lleno de objetos (BASE DATOS)
    2. Se hace un Tree.Add ( key , objeto ), esto por medio de un for que se encarde de TreeAdd(libro[i].NOMBRE , libro)
    3. Se retorna un Tree.InOrden (Un arreglo ordenado que solo contenga los objetos)


*/



const ordenamientoArbol = ( libro ) => {
    class nodo {
        constructor ( key , objeto ){ //Aqui recibo la key que seria 
            this.key = key;
            this.objeto = objeto;
            this.izquierda = null;
            this.derecha = null;
        }
    
        insertar ( key , objeto){
            if( key < this.key ){
                if ( this.izquierda == null ){
                    this.izquierda = new nodo( key , objeto );
                }else{
                    this.izquierda.insertar( key, objeto );    
                }
            }else{ 
                if ( this.derecha == null ){
                    this.derecha = new nodo ( key, objeto );
                }else{
                    this.derecha.insertar( key, objeto );
                }
    
            }
        }
    }

    class arbol {
        constructor (){
            this.nodoInicial = null;
        }

        insertar ( key , objeto ){ 
            if ( this.nodoInicial == null ){
                this.nodoInicial = new nodo ( key , objeto ); 
            }else{
                this.nodoInicial.insertar( key , objeto );
            }
        }

        inOrden ( nodo ){
            if ( nodo == null ){
                return;
            }else{
                this.inOrden( nodo.izquierda );
                //console.log( nodo.key );
                datosInOrden.push ( nodo.objeto );
                this.inOrden( nodo.derecha );
            }
        }
    }


    //RECIBO LA FUNCION LIBRO CON LOS RESULTADOS DE LA CONSULTA SQL
    let raiz = new arbol();
    let datosInOrden = [];

    //SE INSERTAN TODOS LOS DATOS AL ARBOL
    for (let i = 0; i< libro.length;i++){
        raiz.insertar( libro[i].NOMBRE , libro[i] ) //SE MANDA EL TEXTO EN LA KEY Y EL OBJETO
    }

    console.log("IMPRESION inORDEN: ");
    raiz.inOrden( raiz.nodoInicial );
    for (let i = 0; i< datosInOrden.length;i++){
        console.log(datosInOrden[i].NOMBRE);
    }
    
    return datosInOrden;
}

export { ordenamientoArbol }

