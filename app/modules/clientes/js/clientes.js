"use strict";
console.log("clientes.js 1.1");
function doClientes(){
    let paginaActual = 1;
    const resultadosPorPagina = 20;
    const contenedorListado = document.querySelector("main");
    const templateCliente = document.querySelector(".cliente-row");
    const getClientes = (actual)=>{
        let parametroBuscar = "";
        let inicio;
        let parametroPorPagina = "&porpagina=" + resultadosPorPagina;

        if (actual){
            paginaActual = actual;
            
        }
        if (paginaActual==1) {
            inicio = 0;
            
        }else{
            inicio = (paginaActual -1)* resultadosPorPagina;
        }

        const parametroInicio = "?inicio=" + inicio;
        fetch(apiUrlClientesGet + parametroInicio + parametroPorPagina, {method:"GET"}).then((respuesta)=>{
            respuesta.json().then((clientes)=>{
            //console.log(clientes)    
                printListaClientes(clientes.numero_registros, clientes.clientes);

            })
        })

    }
     function printListaClientes(registros, clientes){
        contenedorListado.innerHTML = "";
        doPaginacion (paginaActual, resultadosPorPagina, registros, getClientes);
        
        clientes.forEach(cliente=>{
            const clienteContenedor = templateCliente.cloneNode(true);
            clienteContenedor.classList.remove("hidden");
            const clientesContactosContenedor = clienteContenedor.querySelector(".cliente-row-contactos");
            const templateContacto = clientesContactosContenedor.querySelector(".contactos-contacto");

            //contenido)
            clienteContenedor.querySelector(".cliente-datos-nombre").textContent = cliente.nombre;
            clienteContenedor.querySelector(".cliente-datos-cif").txtContent = cliente.cif;
            clienteContenedor.querySelector(".cliente-datos-nombre").textContent = cliente.telefono;
            clienteContenedor.querySelector(".cliente-datos-nombre").textContent = cliente.direccion;

            //CLONADO DE CONTACTOS
            cliente.contactos.forEach((contacto,index)=>{
                console.log(cliente.contactos[0])
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

}
doClientes();