"use strict";
console.log("clientes.js 1.2");
function doClientes(){
    let paginaActual = 1;
    const resultadosPorPagina = 20;

    const contenedorListado = document.querySelector("main");
    const templateCliente = document.querySelector(".cliente-row");

    const buscadorInput = document.querySelector("#buscador-input");
    const buscadorBoton = document.querySelector("#buscador-boton");

    buscadorBoton.addEventListener("click",()=>{
        if(buscadorInput.value!= ""){
           getClientes(paginaActual, buscadorInput.value);
        }
    })
    const getClientes = (actual,buscar)=>{
        let parametroBuscar = "";
        let busquedaActiva = false;
        let parametroPorPagina = "&porpagina=" + resultadosPorPagina;
        let inicio;

        if (actual){
            paginaActual = actual;
            
        }
        if (paginaActual==1) {
            inicio = 0;
            
        }else{
            inicio = (paginaActual -1)* resultadosPorPagina;
        }
        if(buscar && buscar!=""){
            parametroBuscar = "&buscar=" + buscar;
            busquedaActiva = true;
            parametroPorPagina = "&porpagina=" + 99999;
        }

        const parametroInicio = "?inicio=" + inicio;
        const newLoader = new Loader();

        fetch(apiUrlClientesGet+parametroInicio+parametroPorPagina+parametroBuscar, 
            {method:"GET"})
        .then((respuesta)=>{
            if(!respuesta.ok){
                throw new Error(`Error en la solicitud: ${respuesta.status}`)
            }
            return respuesta.json()
        })
        .then((clientes)=>{
            printListaClientes(clientes.numero_registros, clientes.clientes,busquedaActiva);
            newLoader.destroy();
        }).catch((error)=> {
            newLoader.destroy();
            const mensajeError = `Error en la solicitud: <br> ${error} <br> consulte con un servicio`;
            new Modal(mensajeError, "informacion", "", "")
        });

        

    }
     function printListaClientes(registros, clientes,busqueda){
        contenedorListado.innerHTML = "";
        if(!busqueda){
        doPaginacion (paginaActual, resultadosPorPagina, registros, getClientes);

        }else{
            const verTodosBoton = document.createElement("button");
            verTodosBoton.classList.add("btn-info");
            verTodosBoton.textContent = "Ver listado completo";
            verTodosBoton.addEventListener("click",()=>{
                getClientes();
            })
            document.querySelector("#paginacion").innerHTML = "<h2>Resultados busqueda:"+clientes.length+" </h2>" ;
            document.querySelector("#paginacion").append(verTodosBoton);

        }
        clientes.forEach(cliente=>{
            const clienteContenedor = templateCliente.cloneNode(true);
            clienteContenedor.classList.remove("hidden");
            const clientesContactosContenedor = clienteContenedor.querySelector(".cliente-row-contactos");
            const templateContacto = clientesContactosContenedor.querySelector(".contactos-contacto");

            const clienteBotonEditar = clienteContenedor.querySelector(".cliente-botones-editar");
            clienteBotonEditar.addEventListener("click",() => {
                doEditar(cliente);
            });

            //contenido)
            clienteContenedor.querySelector(".cliente-datos-nombre").textContent = cliente.nombre;
            clienteContenedor.querySelector(".cliente-datos-cif").txtContent = cliente.cif;
            clienteContenedor.querySelector(".cliente-datos-tlf").textContent = cliente.telefono;
            clienteContenedor.querySelector(".cliente-datos-direccion").textContent = cliente.direccion;
            clienteContenedor.querySelector(".cliente-datos-sector").textContent = "Sector: " + cliente.sector;
            

            //CLONADO DE CONTACTOS
            cliente.contactos.forEach((contacto,index)=>{
                //console.log(cliente.contactos[0])
                const contactoContenedor = templateContacto.cloneNode(true);
                contactoContenedor.classList.remove("hidden");
                //contenido de cada contacto
                contactoContenedor.querySelector(".contacto-nombre").textContent = contacto.nombre + " "+contacto.apellido1 + " "+contacto.apellido2;
                contactoContenedor.querySelector(".contacto-tlf").textContent = contacto.telefono1;
                contactoContenedor.querySelector(".contacto-email").textContent = contacto.email1;
                clientesContactosContenedor.append(contactoContenedor)
            })
            
            
            contenedorListado.append(clienteContenedor);
        });

     }
     getClientes();
     function doEditar(cliente){
        const bloqueFormulario = newBloqueFormulario();
        //const contactosContenedor = document.querySelector()
        const clienteFormularioEdicion = bloqueFormulario.querySelector(".cliente-formulario");
        const contactosContenedor = bloqueFormulario.querySelector(".cliente-contactos-contenedor-formulario");
        const contactoFormulario = contactosContenedor.querySelector("form");

        const clientesSelectSector = clienteFormularioEdicion.querySelector("[name = 'select-cliente-sector']");

        const botonEnviar = clienteFormularioEdicion.querySelector(".formulario-boton-enviar");

        clienteFormularioEdicion.querySelector("[name = 'input-cliente-id']").value = cliente.id;
        clienteFormularioEdicion.querySelector("[name = 'input-cliente-nombre']").value = cliente.nombre;
        clienteFormularioEdicion.querySelector("[name = 'input-cliente-cif']").value = cliente.cif;
        clienteFormularioEdicion.querySelector("[name = 'input-cliente-tlf']").value = cliente.telefono;
        clienteFormularioEdicion.querySelector("[name = 'input-cliente-direccion']").value = cliente.direccion;

         getClientesSectores();
        setContactos();
        function setContactos(){
            cliente.contactos.forEach(contacto => {
                const nuevoFormularioContacto = contactoFormulario.cloneNode(true);
                nuevoFormularioContacto.querySelector("[name = 'input-contacto-id']").value = contacto.id;
                nuevoFormularioContacto.querySelector("[name = 'input-contacto-nombre']").value = contacto.nombre;
                nuevoFormularioContacto.querySelector("[name = 'input-contacto-apellido1']").value = contacto.apellido1;
                nuevoFormularioContacto.querySelector("[name = 'input-contacto-apellido2']").value = contacto.apellido2;
                nuevoFormularioContacto.querySelector("[name = 'input-contacto-telefono']").value = contacto.telefono1;
                nuevoFormularioContacto.querySelector("[name = 'input-contacto-email']").value = contacto.email1;
                const botonEnviar = nuevoFormularioContacto.querySelector("button.enviar");
                const botonEliminar = nuevoFormularioContacto.querySelector("button.eliminar");
                botonEnviar.addEventListener("click", (event) =>{
                    event.preventDefault();
                    console.log("enviando cambios de contacto", contacto.id );
                    
                });
                botonEliminar.addEventListener("click", (event) =>{
                    event.preventDefault();
                    console.log("eliminando contacto", contacto.id);
                });
                nuevoFormularioContacto.classList.remove("hidden");
                contactosContenedor.append(nuevoFormularioContacto);

            })
            

        }
        
         

         function getClientesSectores(){
            fetch(apiUrlClientesSectoresGet, {method: "GET"})
            .then(respuesta => respuesta.json()
            .then(sectores => {
                sectores.forEach(sector => {
                    const opcionSector = document.createElement("option");
                    opcionSector.value = sector.id;
                    opcionSector.textContent = sector.nombre;
                    if(sector.id == cliente.id_sector){
                        opcionSector.setAttribute("selected","selected");

                    }
                    clientesSelectSector.append(opcionSector);
                })
            })
            )
         }
         botonEnviar.addEventListener("click", (event) =>{
            event.preventDefault();
            new Modal ("Seguro que quiere efetuar cambios?", "confirmacion", guardarUpdateCliente, "");

            
            
         });
         
         function guardarUpdateCliente(){
            const datosFormulario = new FormData(clienteFormularioEdicion);
            fetch(apiUrlClientesUpdate,{ method: "POST", body: datosFormulario})
            .then((response) => {
                if(!response.ok){
                    throw new Error(`No se ha podido leer la tabla de contactos: <br> ${respuesta.status}`);
                }
                return response.json();
            })
            .then((data) => {
                new Modal (data,"Informacion", "", "");
                

            })
            .catch((error)=>{
                const mensajeError = `Error en la solicitud: <br> ${error} <br> Consulte con el servicio técnico`;
                new Modal(mensajeError,"informacion","","");
            })
         }

        

        contenedorListado.innerHTML = "";
        contenedorListado.append(bloqueFormulario);
        bloqueFormulario.classList.remove("hidden");



     }
     function newBloqueFormulario(){
        const bloqueFormulario = document.querySelector("#bloque-formulario");
        bloqueFormulario.id = "";
        bloqueFormulario.classList.add("bloque-formulario");
        return bloqueFormulario;
     }

}
doClientes();