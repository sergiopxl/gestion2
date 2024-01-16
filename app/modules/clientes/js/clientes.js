"use strict";
console.log("clientes.js 1.1");
function doClientes(){
    const contenedorListado = document.querySelector("main");
    const templateCliente = document.querySelector(".cliente-row");
    function getClientes(){
        fetch(apiUrlClientesGet, {method:"GET"}).then((respuesta)=>{
            respuesta.json().then((clientes)=>{
            //console.log(clientes)    
                printListaClientes(clientes)

            })
        })

    }
     function printListaClientes(clientes){
        contenedorListado.innerHTML = "";
        
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