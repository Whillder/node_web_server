// let nrofactura = document.querySelector("#nroFactura").value;
// let fecha = document.querySelector("#fecha").value;

let factura=[];
let productos=[];
function agregarProducto(e){
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;


    let selectProducto = abuelo.querySelector("#selectProducto").value;
    let pTotal =  abuelo.querySelector("#pTotal").value;
    let cantidad = abuelo.querySelector("#cantidad").value;
    let producto = {

        nombre: selectProducto,
        precio: pTotal,
        cantidad:cantidad,
        precioU:(pTotal/cantidad)
    };
    let numero = document.querySelectorAll(".numero");
    validador(numero);
    if((cantidad!= "" && cantidad!=null)&&(pTotal!="" && pTotal!=null)&&(selectProducto!=0 && selectProducto!=null)){
        productos.push(producto);
        alerta();
        mostrarLista();
    }
    else{
        alerta2();
    }
}

function validador(valor){
    {
        if(valor.value < 0){
          valor.value = 1;
        }
      }
}

function alerta (){
    Toastify({
        text:"Producto Agregado",
        duration:2000,
        gravity: "Top",
        position: "right",
        style:{
            fontSize:"25px",
            fontFamily: "Verdana",


        }
    }).showToast();
}
function alerta2(){
    Toastify({
        text:"Debe Ingresar los datos completos",
        duration:2000,
        gravity: "Top",
        position: "center",
        style:{
            fontSize:"25px",
            fontFamily: "Verdana",
            background: "linear-gradient(to right, #DD400E, #D88828)",
        }
    }).showToast();
}
function alerta3(){
    Toastify({
        text:"Debe Ingresar los datos de la factura",
        duration:2000,
        gravity: "Top",
        position: "center",
        style:{
            fontSize:"25px",
            fontFamily: "Verdana",
            background: "linear-gradient(to right, #DD400E, #D88828)",
        }
    }).showToast();
}

function mostrarLista(){

    let tabla = document.getElementById("tbody");

    tabla.innerHTML = "";
    let idx=1;
    for( let producto of productos ){
    
        let fila = document.createElement("tr");
        fila.innerHTML = `<td id ="idProd">${idx}</td>
                          <td>${producto.cantidad}</td>
                          <td><p>${producto.nombre}</p></td>
                          <td>${producto.precioU}</td>
                          <td>${producto.precio}</td>
                          <td name="${idx}"><a href= "#" class="btn btn-danger btnBorrarProducto">Borrar</a></td>`;
        tabla.append(fila);
        idx++;
    }
    let btnBorrar = document.querySelectorAll(".btnBorrarProducto");
   
    for( let btn of btnBorrar){
        btn.addEventListener("click" , borrarProducto );
    }
    document.querySelector(".formProducto").reset();
}
    function borrarProducto(e){
        let hijo = e.target;
        let padre = hijo.parentNode;
        let abuelo = padre.parentNode;
        let valorDelName = padre.getAttribute("name");
        let fuckid= parseInt(valorDelName) - 1;

        abuelo.remove();

        let productoAEliminar = productos[fuckid];

        productos = productos.filter(function(producto) {
        return producto !== productoAEliminar;
        });

        if(productoAEliminar==0){
            productos=[];
        };
        mostrarLista();
}

let btnAgregar = document.querySelector(".btnAgregar");
btnAgregar.addEventListener("click", agregarProducto);


function unirFactura(e){
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;
    let abuelo2=abuelo.parentNode;
    let abuelo3=abuelo2.parentNode;


    let nroFactura = abuelo3.querySelector("#nroFactura").value;
    let fecha = abuelo3.querySelector("#fecha").value;
    let datosFactura = {
        nroFactura: nroFactura,
        fecha: fecha,
    };

    if((nroFactura!= "" && nroFactura!=null)&&(fecha!="" && fecha!=null)){
        factura.push(datosFactura);
        factura.push(...productos);
        guardarFactura();
    }
    else{
        alerta3();
    }
}
        function guardarFactura(){
        let arrJson = JSON.stringify(factura);
        localStorage.setItem("factura" , arrJson);
        document.querySelector(".formFactura").reset();
        document.querySelector(".formProducto").reset();
        document.querySelector("#tbody").innerHTML = "";
// }    
}
let btnfactura = document.querySelector(".btnfactura");
btnfactura.addEventListener("click" , unirFactura);

function mostrar_clima (posicion){
    let lat=posicion.coords.latitude;
    let long=posicion.coords.longitude;
    let key= "da0a959f8f0ac5fddbad675880450830";

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}&lang=es`)
    .then( response => response.json())
    .then(data => {
        let clima = document.getElementById("clima");
        clima.innerHTML = `<marquee>Estas ubicado en: ${data.name} con una temperatura de: ${data.main.temp}° con un clima: ${data.weather[0].description}
        </marquee>`

    })
}

navigator.geolocation.getCurrentPosition(mostrar_clima);
