"use strict";
console.log("proveedores.js 1.2");
function doProveedores() {
    
    let paginaActual = 1;
    const resultadosPorPagina = 20;

    const contenedorListado = document.querySelector("main");
    const templateProveedor = document.querySelector("#proveedor-row");

    const buscadorInput = document.querySelector("#buscador-input");
    const buscadorBoton = document.querySelector("#buscador-boton");
    const proveedorNuevoBtn = document.querySelector("#nuevo-proveedor-btn");

    proveedorNuevoBtn.addEventListener("click", ()=>{
        doNuevoProveedor();

    })

    buscadorBoton.addEventListener("click", ()=>{
        if (buscadorInput.value != "") {
            getProveedores(paginaActual, buscadorInput.value);
            
        }
    } );


    const nuevoProveedorBtn = document.querySelector("#nuevo-proveedor-btn");
/*
    nuevoProveedorBtn.addEventListener("click", (event) => {

        event.preventDefault();
        doNuevoProveedor();
    });
*/
    const getProveedores = (actual,buscar)=>{
       
        let parametroBuscar = "";
        let busquedaActiva = false;
        let parametroPorPagina = "&porpagina=" + resultadosPorPagina;
        let inicio;

        if (actual) {
            paginaActual = actual;

            
        }
        if (paginaActual==1) {
            inicio = 0;

            
        }else{
            inicio = (paginaActual -1)* resultadosPorPagina;
        }
        if (buscar && buscar!= "") {
            parametroBuscar = "&buscar" + buscar;
            busquedaActiva = true;
            parametroPorPagina = "&porpagina=" + 99999;
            
        }
        const parametroInicio = "?inicio=" + inicio;
        const newLoader = new Loader();
        
        fetch(apiUrlProveedoresGet+parametroInicio+parametroPorPagina+parametroBuscar,
            {method:"GET"})
            .then((respuesta)=>{
                if (!respuesta.ok) {
                    throw new Error(`Error en la solicitud: ${respuesta.status}`)

                    
                }
                return respuesta.json()
                
            })
            .then((proveedores)=>{
                printListaProveedores(proveedores.numero_registros, proveedores.proveedores, busquedaActiva);
                newLoader.destroy();
            }).catch((error)=>{
                newLoader.destroy();
                const mensajeError = `Error en la solicitud: <br> ${error} <br> consulte con el servicio tecnico mi rey`;
                new Modal(mensajeError, "informacion", "", "")
            });

        

            
    }
    function printListaProveedores(registros, proveedores, busqueda) {
        
        contenedorListado.innerHTML = "";
        if (!busqueda) {
            doPaginacion(paginaActual, resultadosPorPagina, registros, getProveedores);

            
        }else{
            const verTodosBoton = document.createElement("button");
            verTodosBoton.classList.add("btn-info");
            verTodosBoton.textContent = "Ver listado completo";
            verTodosBoton.addEventListener("click",()=>{
                getClientes();
            })
            document.querySelector("#paginacion").innerHTML = "<h2>Resultados busqueda:"+proveedores.length+" </h2>" ;
            document.querySelector("#paginacion").append(verTodosBoton);


        }
        proveedores.forEach(proveedor => {
            
           
            const proveedorContenedor = templateProveedor.cloneNode(true);
            proveedorContenedor.id ="";
            proveedorContenedor.classList.add("proveedor-row");
            proveedorContenedor.classList.remove("hidden");
            const proveedoresContactosContenedor = proveedorContenedor.querySelector(".proveedores-contactos");
         
            proveedor.contactos.forEach(contacto=>{
                
                const templateContacto = proveedoresContactosContenedor.querySelector(".contacto-template").cloneNode(true);
                
                templateContacto.classList.remove("hidden","contacto-template");
                templateContacto.querySelector(".contacto-nombre").textContent = contacto.name;
                templateContacto.querySelector(".contacto-tlf").textContent = contacto.phone1;
                templateContacto.querySelector(".contacto-email").textContent = contacto.mail1;
                proveedoresContactosContenedor.append(templateContacto);
            })
            // const proveedorBotonEditar = proveedorContenedor.querySelector(".proveedor-botones-editar");

            // const proveedorBotonEditar = proveedoreContenedor.querySelector(".cliente-botones-editar");
            // proveedorBotonEditar.addEventListener("click",() => {
            //     doEditar(cliente);
        proveedorContenedor.querySelector(".proveedor-datos-nombre").textContent = proveedor.nombre;
        proveedorContenedor.querySelector(".proveedor-datos-cif").textContent = proveedor.cif;
        proveedorContenedor.querySelector(".proveedor-datos-tlf").textContent = proveedor.telefono;
        proveedorContenedor.querySelector(".proveedor-datos-direccion").textContent = proveedor.direccion;
        proveedorContenedor.querySelector(".proveedor-datos-servicio").textContent = "Servicio: " + proveedor.servicio;

        contenedorListado.append(proveedorContenedor);


        });

  
        
    }
getProveedores();
//metodo para servicios
function getProveedoresServicios(proveedoresSelectServicio, proveedorIdServicio){
    fetch(apiUrlProveedoresServiciosGet, {method: "GET"})
    .then(respuesta => respuesta.json()
    .then(servicios => {
        servicios.forEach(servicio => {
            const opcionServicio = document.createElement("option");
            opcionServicio.value = servicio.id;
            opcionServicio.textContent = servicio.name;
            if(proveedorIdServicio == undefined && servicio.id == servicioIdServicio){
                opcionSector.setAttribute("selected","selected");

            }
            proveedoresSelectServicio.append(opcionServicio);
        })
    })
    )
 }
 function newBloqueFormulario(){
    const bloqueFormulario = document.querySelector("#bloque-formulario");
    bloqueFormulario.id = "";
    bloqueFormulario.classList.add("bloque-formulario");
    return bloqueFormulario;
 }
 function doNuevoProveedor(){

    const bloqueFormulario = newBloqueFormulario();
    const proveedorFormularioEdicion = bloqueFormulario.querySelector(".proveedor-formulario");
    bloqueFormulario.querySelector(".proveedor-contactos-contenedor-formulario").remove();

    const proveedoresSelectServicio = proveedorFormularioEdicion.querySelector("[name = 'select-proveedor-servicio']");
    const botonNuevoProveedorEnviar = proveedorFormularioEdicion.querySelector(".formulario-boton-enviar");

    getProveedoresServicios(proveedoresSelectServicio,"");

    botonNuevoProveedorEnviar.addEventListener("click", (e) => {
        e.preventDefault();
        new Modal ("Quieres dar de alta a este proveedor?", "confirmacion", guardarNuevoProveedor, proveedorFormularioEdicion);

    });
    
       

    contenedorListado.innerHTML = "";
    contenedorListado.append(bloqueFormulario);
    bloqueFormulario.classList.remove("hidden");

    function guardarNuevoProveedor(proveedorFormularioEdicion) {
        const datosFormulario = new FormData(proveedorFormularioEdicion);

        fetch(apiUrlProveedoresPost, {method: "POST", body: datosFormulario})
        .then((respuesta) => {
            if(!respuesta.ok) {
                throw new Error(`Error en la solicitud: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .then((data) => {
            new Modal(data, "informacion", "", "");
        })
        .catch((error) => {
            const mensajeError = `Error en la solicitud <br> ${error} <br> Consulte con el servicio tecnico`;
            new Modal(mensajeError,"informacion","","");

        });


}



}

}

doProveedores();