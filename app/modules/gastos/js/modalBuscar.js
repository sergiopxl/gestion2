class ModalBuscar {
    // Elementos del modal
    contenedor = document.createElement("div"); // Contenedor principal del modal
    inputBusqueda = document.createElement("input"); // Campo de búsqueda
    boton = document.createElement("button"); // Botón de búsqueda
    resultado = document.createElement("div"); // Resultado de la búsqueda
    exit = document.createElement("div"); // Botón para cerrar el modal

    // Constructor de la clase
    constructor() {
        // Agregar clases CSS a los elementos del modal
        this.contenedor.classList.add("modal-contenedor");
        this.inputBusqueda.classList.add("input-modal");
        this.boton.classList.add("btn-modal");
        this.boton.textContent= "Buscar";
        this.resultado.classList.add("resultado-modal");
        this.exit.classList.add("exit-modal");

        // Texto del botón de cierre
        this.exit.textContent = "x";

        // Evento al hacer clic en el botón de búsqueda
        this.boton.addEventListener("click", () => {
            // Realizar la búsqueda utilizando fetch API
            fetch(apiUrlProveedoresGet + "?buscar=" + this.inputBusqueda.value, { method: "GET" })
                .then(response => {
                    // Manejo de errores HTTP
                    if (!response.ok) {
                        throw new Error('La solicitud no pudo ser completada correctamente.' + response.status);
                    }
                    return response.json(); // Convertir la respuesta a formato JSON
                })
                .then(respuesta => {
                    // Crear elementos HTML para mostrar los resultados de la búsqueda
                    const contenedorResultadoClientes = document.createElement("div");
                    for (let i = 0; i < respuesta.proveedores.length; i++) {
                        const cliente = respuesta.proveedores[i];
                        const divClienteResultadoBusqueda = document.createElement("div");
                        // Evento al hacer clic en un cliente encontrado
                        divClienteResultadoBusqueda.addEventListener("click", () => {

                            // Actualizar la vista con el nombre del cliente seleccionado
                            document.querySelector(".cliente-vista span").textContent = cliente.nombre;
                            document.querySelector("[name='input-id-proveedor']").value = cliente.id;
                            this.destroy(); // Cerrar el modal después de seleccionar un cliente

                            
                            cliente.contactos.forEach(contacto=>{
                                const option = document.createElement("option");
                                option.value = contacto.id;
                                option.textContent= `${contacto.nombre} ${contacto.apellido1} ${contacto.apellido2}`;
                                selectContactos.appendChild(option);
                            });
                               this.destroy(); 
                        });
                        // Mostrar el nombre del cliente en el resultado de la búsqueda
                        divClienteResultadoBusqueda.textContent = cliente.nombre;
                        contenedorResultadoClientes.append(divClienteResultadoBusqueda);
                    }
                    this.contenedor.append(contenedorResultadoClientes); // Agregar los resultados al modal
                });
        });


        // Evento para cerrar el modal al hacer clic en el botón de cierre
        this.exit.addEventListener("click", () => {
            this.destroy(); // Cerrar el modal
        });

        // Agregar los elementos del modal al contenedor principal
        this.contenedor.append(this.exit, this.inputBusqueda, this.boton, this.resultado);

        // Agregar el modal al cuerpo del documento HTML
        document.querySelector("body").append(this.contenedor);
    }

    // Método para destruir el modal
    destroy() {
        this.contenedor.remove(); // Eliminar el modal del DOM
    }
}
