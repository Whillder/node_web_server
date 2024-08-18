let arr= localStorage.getItem('factura');
let datosFactura=JSON.parse(arr);
document.getElementById("header1").innerHTML = ` <img src="./img/temple-logo-mobile.svg" alt="Logo imagen"> <h1 class="display-4">Factura NRO ${datosFactura[0].nroFactura}</h1>`;

let tabla1 = document.getElementById("tbody1");
for (i = 1; i < datosFactura.length; i++){
let fila = document.createElement("tr");
        fila.innerHTML = `<td>${datosFactura[i].cantidad}</td>
                          <td><p>${datosFactura[i].nombre}</p></td>
                          <td>${datosFactura[i].precioU}</td>
                          <td>${datosFactura[i].precio}</td>`
        tabla1.append(fila);
};
function totalFactura(){
    let nroTotal=0;
    let table = document.getElementById("table");
    for (i=1; i< table.rows.length-1; i++){
        filaSuma = table.rows[i].cells[3].innerHTML;
        nroTotal=nroTotal + Number(filaSuma);
    }
    let total = document.getElementById("total");
    total.textContent = nroTotal;
};
totalFactura();
