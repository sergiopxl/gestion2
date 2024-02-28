"use strict";
console.log("gastos.js 1.1");

function doGastos() {
  //primero creamos la funcion  doGastos
  const contenedorListado = document.querySelector(".contenedorlistado"); //capturamos el contenedor
  const templateGasto = document.querySelector("#gastos-template"); //capturamos el template
  const botonNuevoGasto = document.querySelector("#nueva-gasto-btn");
  const templateNuevoGasto = document.querySelector(
    "#bloque-formulario-nuevoGasto"
  );

  botonNuevoGasto.addEventListener("click", (e) => {
    e.preventDefault();
    doNuevoGasto();
  });

  getGastos();

  function getGastos() {
    fetch(
      apiUrlGastosGet, //con esta linea me conecto con el php
      { method: "GET" }
    ) //aca se config el verbo para pedir o enviar etc
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }
        respuesta.json().then((gastos) => {
          //console.log(gastos);

          printGastos(gastos);
        });
      });
  }
  function printGastos(gastos) {
    gastos.forEach((gasto) => {
      //console.log(gasto);
      const gastosRow = templateGasto.cloneNode(true); //clone el template
      gastosRow.id = ""; // vaciado solo del ID
      gastosRow.classList.remove("hidden"); //le saco el hidden para que se muestre cuando lo llene
      gastosRow.querySelector(".gasto-numero strong").textContent =
        gasto.proveedor; //lo empiezo a llenar, lo que esta entre comillas donde quiero meterlo en que parte del html y lo segudo el.proveedor por ejemplo es de donde saco el dato, lo mismo con los de abajo
      gastosRow.querySelector(".gasto-importe strong").textContent =
        gasto.baseimponible;
      gastosRow.querySelector(".gasto-estado strong").textContent =
        gasto.id_estado == 1 ? "Pagado" : "Pendiente"; //si gasto.id es == 1 es "pagado" :sino
      gastosRow.querySelector(".gasto-fecha-emision strong").textContent =
        gasto.fecha_emision;
      contenedorListado.append(gastosRow);
    });
  }

  function doNuevoGasto() {
    contenedorListado.innerHTML = ""; //limpio el contenedorListado
    const formularioNuevoGasto = templateNuevoGasto.cloneNode(true); //creo una variable nueva y le clonamos el templateNuevoGasto
    formularioNuevoGasto.id = ""; //limpiamos el id
    formularioNuevoGasto.classList.remove("hidden"); //aca como clonamos el template del html que tenia hidden, se lo sacamos
    contenedorListado.append(formularioNuevoGasto); //con append le meto el template al contenedorListado
    const botonGuardarGasto = formularioNuevoGasto.querySelector(
      "#formulario-boton-guardar"
    ); //busco en la plantila(formularioNuevoGasto)el id del boton del html y guardo esa referencia en la variable que cree botonGuardarGasto
    botonGuardarGasto.addEventListener("click", (e) => {
      //aca le doy un evento al boton
      e.preventDefault();
      const botonGuardarCambio = document.createElement("button");
      botonGuardarCambio.textContent = "guardar";
      botonGuardarCambio.classList.add("btn-succes");
      botonGuardarCambio.addEventListener("click", e => {
        e.preventDefault();
        guardarNuevaFactura();
  
      })
    });
    const botonBuscar = formularioNuevoGasto.querySelector("#buscar-cliente-btn")
    botonBuscar.addEventListener("click",(e)=>{
      e.preventDefault();
      new ModalBuscar()
    })
  }
}

doGastos();
