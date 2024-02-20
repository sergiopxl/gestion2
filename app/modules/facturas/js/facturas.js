"use strict"
console.log("facturas.js 1.1");

function doFacturas() {

  const contenedorListado = document.querySelector("main");
  const templateFactura = document.querySelector("#factura-template");
  const templateFacturaItem = templateFactura.querySelector("#factura-item-template");
  console.log(templateFacturaItem)
  const contenedorAcciones = document.querySelector("#acciones");
  const inputIva= document.querySelector("#input-iva")
  





  /*
    - selección de elementos html
    - declaración de variables de ambito general 
    - eventos de acciones generales del apartado
  */
/* - recogida de datos del formulario creando un JSON, no se puede hacer con un FormData. - envio de datos al API POST, los datos del body han de ir en formato JSON pero convertidos a cadena. - información resultado del alta */
  getFacturas();


  function getFacturas() {
    fetch(apiUrlFacturasGet + "?listado=1",
      { method: "GET" })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error en la solicitud: ${respuesta.status}`)
        }
        respuesta.json()
          .then((facturas) => { printFacturas(facturas) })

      })

    /*
      llamada al API que retorna las facturas
    */

    //printFacturas(facturas) // esto se ejecuta cuando se resuelve la llamada al API
  }

  function printFacturas(facturas) {
    contenedorListado.innerHTML = "";
    facturas.forEach(factura => {
      //console.log(factura)
      const contenedorFactura = templateFactura.cloneNode(true);
      //console.log("contenedorFactura",contenedorFactura)
      contenedorFactura.id = "";
      contenedorFactura.classList.remove("hidden");
      const contenedorItems = contenedorFactura.querySelector(".factura-items")
      //console.log("contenedorItems",contenedorItems)
      contenedorItems.innerHTML = ""

      contenedorFactura.querySelector(".factura-numero strong").textContent = factura.id;
      contenedorFactura.querySelector(".factura-cliente strong").txtContent = factura.cliente;
      contenedorFactura.querySelector(".factura-estado strong").textContent = factura.estado;
      contenedorFactura.querySelector(".factura-importe strong").textContent = factura.importe;
      contenedorFactura.querySelector(".factura-descripcion").textContent = factura.descripcion;

      factura.items.forEach(item => {

        const contenedorItem = templateFacturaItem.cloneNode(true);

        contenedorItem.classList.remove("hidden");
        contenedorItem.id = "";
        contenedorItem.querySelector(".item-descripcion").textContent = item.descripcion;
        contenedorItem.querySelector(".item-importe").textContent = item.importe;

        contenedorItems.append(contenedorItem)


      })
      contenedorListado.append(contenedorFactura)

    });

    const nuevaFacturaBtn = document.querySelector("#nueva-factura-btn");
    nuevaFacturaBtn.addEventListener("click", (event) => {
      event.preventDefault();
      doNuevaFactura();

    });

    /*
      - limpiar main
      + bucle sobre el array de facturas
        - clonado del template de factura que se encuentra en el html , eliminar id, quita clase oculto, añadir clase
        - carga de datos de factura
        - evento de boton editar -> editarFactura(factura)
        + bucle sobre items de facturas
          - clonado de template item , eliminar id, quita clase oculto, añadir clase
          - carga datos item
          - appen item al contenedor de items
        - append factura al main
    */
  }
  function actualizarInputFecha() {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2); // Agrega un cero delante si es necesario
    const dia = ('0' + fechaActual.getDate()).slice(-2); // Agrega un cero delante si es necesario

    const fechaFormateada = `${año}-${mes}-${dia}`;

    const inputFecha = document.querySelector("[name='input-fecha-emision']");
    inputFecha.value = fechaFormateada;
}

// Llamar a la función para actualizar el input de fecha cuando se cargue la página
actualizarInputFecha();


  function doNuevaFactura() {
   


    contenedorListado.innerHTML = "";
    const contenedorItems = document.querySelector(".listado-conceptos")

    const templateCfactura = document.querySelector("#factura-new-template");
    contenedorListado.append(templateCfactura);

    

    
    /////
    contenedorAcciones.innerHTML = "";
    const botonBuscarCliente = document.querySelector("#buscar-cliente-btn")
    botonBuscarCliente.addEventListener("click",()=>{
      new ModalBuscar();

    })


    const botonGuardar = document.createElement("button");
    botonGuardar.textContent = "guardar";
    botonGuardar.classList.add("btn-succes");
    botonGuardar.addEventListener("click", e => {
      e.preventDefault();
      guardarNuevaFactura();

    })
    const nuevoConcepto = document.createElement("button");
    nuevoConcepto.textContent = "nuevo concepto";
    nuevoConcepto.classList.add("btn-success");
    nuevoConcepto.addEventListener("click", e => {
      e.preventDefault;
      crearItem(contenedorItems);
    })
    contenedorAcciones.append(botonGuardar, nuevoConcepto);















    /*
      - limpiar main
      - clonado de formulario factura , eliminar id, quita clase oculto, añadir clase
      - evento botón nuevoConcepto -> crearItem(contenedorItems)
      - evento boton buscar cliente -> buscarCliente()
      - evento botón guardar -> guardarNuevaFactura()
    */

      function guardarNuevaFactura() {
        // Recogida de datos del formulario creando un JSON
        const nuevaFactura = {
          baseimponible: baseimponible,
          iva: document.querySelector("#input-iva").value,
          descripcion: document.querySelector("textarea[name='descripcion-concepto']").value,
          id_cliente: document.querySelector("input[name='input-id-cliente']").value,
          importe: constIva,
          
          items:[]
        };

        const items = document.querySelectorAll(".concepto-template");
        items.forEach(item=> { 
          nuevaFactura.items.push({
            descripcion: item.querySelector("[name = 'descripcion-concepto']").value,
            importe: item.querySelector("[name = 'input-importe']").value

          });
        
        })
        console.log(JSON.stringify(nuevaFactura))
        // Envío de datos al API POST
        fetch(apiUrlFacturasPost, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest", // Para el control de solicitudes AJAX en PHP
              
            },
            body: JSON.stringify(nuevaFactura)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(resultado => {
            console.log("Respuesta del servidor:", resultado);
            // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje al usuario.
        })
        .catch(error => {
            console.error("Error al enviar la factura:", error);
            // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error al usuario.
        });
    }
    

  }

  function editarFactura(factura) {
    /*
      - limpiar main
      - clonado de formulario factura, eliminar id, añadir clase
      - evento botón nuevoConcepto -> crearItem(contenedorItems)
      - evento boton buscar cliente -> buscarCliente() 
      - evento botón guardar -> guardarEdicionFactura()
      - cargar datos de factura en el formulario
      + bucle sobre factura.items
        - crearItem(contenedorItems,datoItem)
    */
    function guardarEdicionFactura() {
      /*
       - recogida de datos del formulario creando un JSON, no se puede hacer con un FormData.
       - envio de datos al API POST, los datos del body han de ir en formato JSON pero convertidos a cadena.
       - información resultado del alta
     */
    }
  }

  function crearItem(contenedorItems, datoItem) {
    console.log("Agregue un item!")

    const bloqueFormulario = contenedorItems.querySelector("#concepto-template").cloneNode(true);
    bloqueFormulario.id = "";
    bloqueFormulario.classList.add("concepto-template");
    bloqueFormulario.classList.remove("hidden");

    contenedorItems.append(bloqueFormulario);

    bloqueFormulario.querySelector("[name='input-importe']").addEventListener("change", function () {

      calcularImporteTotal();
    });


    const eliminarBtn = bloqueFormulario.querySelector(".eliminar-concepto");
    eliminarBtn.addEventListener("click", function () {
      bloqueFormulario.remove();
      calcularImporteTotal();
      
    });



    contenedorItems.append(bloqueFormulario);
    /*  - clonado del template de item desde el objeto que recibimos por parametro , eliminar id, quita clase oculto, añadir clase concepto-template
      - evento cambio de importe -> calcularImporteTotal();
      - evento eliminar item -> eliminarItem(item) -> calcularImporteTotal(); 
      - appen item al contendorItems
    */
//TODO: pasar el codigo al chatgpt para comentar y explicar
  }
  function calcularImporteTotal() {
    const importeTotalContainer = document.querySelector(".importe-total");
    
    let importeIva=0;

    let importeTotal = 0;
    const importes = document.querySelectorAll("[name='input-importe']");
    const iva=document.querySelector("[name='input-iva']").value;
    importes.forEach(importe => {

      importeTotal += parseFloat(importe.value)
      importeIva = importeTotal*(1+(iva/100));
    });

    

    importeTotalContainer.textContent=formatoMoneda(importeIva);
    constIva = importeIva;
    baseimponible = importeTotal;


    



  }
  let constIva = 0;
  let baseimponible = 0;

  inputIva.addEventListener("change" ,()=> {
    calcularImporteTotal();
    
  }) 
  function buscarCliente() {
    new ModalBuscar();

    /*
      - mostrar modal con buscador
      - evento boton buscar -> getClientes(consulta)
    */
    function getClientes(consulta) {
      
      /*
        - consulta al api 
        - mostrar resultados
        - evento seleccionar resultado
      */
    }
  }
}
doFacturas();