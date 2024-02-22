"use strict"; // Activa el modo estricto de JavaScript para un código más seguro.

console.log("clientes.js 1.2"); // Imprime un mensaje en la consola indicando la versión del archivo.

function doClientes(){ // Define una función principal llamada doClientes que probablemente maneje funcionalidades relacionadas con los clientes.
    let paginaActual = 1; // Inicializa la variable para almacenar la página actual.
    const resultadosPorPagina = 20; // Establece el número de resultados por página.

    const contenedorListado = document.querySelector("main"); // Obtiene el contenedor principal del listado de clientes en el DOM.
    const templateCliente = document.querySelector(".cliente-row"); // Obtiene el template para la fila de cliente en el DOM.

    const buscadorInput = document.querySelector("#buscador-input"); // Obtiene el input del buscador en el DOM.
    const buscadorBoton = document.querySelector("#buscador-boton"); // Obtiene el botón del buscador en el DOM.

    buscadorBoton.addEventListener("click",()=>{ // Agrega un event listener para el clic en el botón de búsqueda.
        if(buscadorInput.value != ""){ // Verifica si el campo de búsqueda no está vacío.
           getClientes(paginaActual, buscadorInput.value); // Llama a la función para obtener clientes con los parámetros de página actual y valor de búsqueda.
        }
    });
    
    const nuevoClienteBtn = document.querySelector("#nuevo-cliente-btn"); // Obtiene el botón para agregar un nuevo cliente en el DOM.

    nuevoClienteBtn.addEventListener("click", (event) => { // Agrega un event listener para el clic en el botón de nuevo cliente.
        doNuevoCliente(); // Llama a la función para agregar un nuevo cliente.
    });

    const getClientes = (actual, buscar) => { // Define una función para obtener clientes del servidor.
        let parametroBuscar = ""; // Inicializa el parámetro de búsqueda.
        let busquedaActiva = false; // Indica si la búsqueda está activa.
        let parametroPorPagina = "&porpagina=" + resultadosPorPagina; // Establece el parámetro para la cantidad de resultados por página.
        let inicio; // Variable para el inicio de los resultados.

        if (actual) { // Verifica si se proporciona un valor de página actual.
            paginaActual = actual; // Actualiza la página actual.
        }
        if (paginaActual == 1) { // Verifica si la página actual es la primera.
            inicio = 0; // Establece el inicio de los resultados en 0.
        } else {
            inicio = (paginaActual - 1) * resultadosPorPagina; // Calcula el inicio de los resultados en función de la página actual.
        }
        if (buscar && buscar != "") { // Verifica si hay un valor de búsqueda válido.
            inicio = 0; // Establece el inicio de los resultados en 0 para la búsqueda.
            parametroBuscar = "&buscar=" + buscar; // Establece el parámetro de búsqueda.
            busquedaActiva = true; // Indica que la búsqueda está activa.
            parametroPorPagina = "&porpagina=" + 99999; // Establece una cantidad alta de resultados por página para la búsqueda.
        }

        const parametroInicio = "?inicio=" + inicio; // Crea el parámetro para el inicio de los resultados.
        const newLoader = new Loader(); // Crea un nuevo loader para indicar la carga de datos.

        fetch(apiUrlClientesGet + parametroInicio + parametroPorPagina + parametroBuscar, {method:"GET"}) // Realiza una solicitud GET al servidor para obtener los clientes.
        .then((respuesta) => { // Maneja la respuesta de la solicitud.
            if (!respuesta.ok) { // Verifica si la respuesta no es exitosa.
                throw new Error(`Error en la solicitud: ${respuesta.status}`); // Lanza un error con el mensaje correspondiente.
            }
            return respuesta.json(); // Convierte la respuesta a formato JSON.
        })
        .then((clientes) => { // Maneja los datos de los clientes obtenidos.
            printListaClientes(clientes.numero_registros, clientes.clientes, busquedaActiva); // Llama a la función para imprimir la lista de clientes.
            newLoader.destroy(); // Elimina el loader una vez que se han obtenido los datos.
        })
        .catch((error) => { // Maneja los errores ocurridos durante la solicitud.
            newLoader.destroy(); // Elimina el loader en caso de error.
            const mensajeError = `Error en la solicitud: <br> ${error} <br> consulte con un servicio`; // Crea un mensaje de error.
            new Modal(mensajeError, "informacion", "", ""); // Muestra un modal con el mensaje de error.
        });
    }

    function printListaClientes(registros, clientes, busqueda) { // Define una función para imprimir la lista de clientes en el DOM.
        contenedorListado.innerHTML = ""; // Limpia el contenedor de la lista de clientes.
        if (!busqueda) { // Verifica si no hay una búsqueda activa.
            doPaginacion(paginaActual, resultadosPorPagina, registros, getClientes); // Llama a la función para crear la paginación.
        } else {
            const verTodosBoton = document.createElement("button"); // Crea un botón para ver todos los resultados.
            verTodosBoton.classList.add("btn-info"); // Agrega una clase al botón.
            verTodosBoton.textContent = "Ver listado completo"; // Establece el texto del botón.
            verTodosBoton.addEventListener("click",() => { // Agrega un event listener para el clic en el botón.
                getClientes(); // Llama a la función para obtener todos los clientes.
            });
            document.querySelector("#paginacion").innerHTML = "<h2>Resultados busqueda:" + clientes.length + " </h2>"; // Actualiza el DOM con el número de resultados de la búsqueda.
            document.querySelector("#paginacion").append(verTodosBoton); // Agrega el botón al DOM.
        }
        clientes.forEach(cliente => { // Itera sobre cada cliente obtenido.
            const clienteContenedor = templateCliente.cloneNode(true); // Clona el template de la fila del cliente.
            clienteContenedor.classList.remove("hidden"); // Remueve la clase 'hidden' para mostrar el cliente.
            const clientesContactosContenedor = clienteContenedor.querySelector(".cliente-row-contactos"); // Obtiene el contenedor de los contactos del cliente.
            const templateContacto = clientesContactosContenedor.querySelector(".contactos-contacto"); // Obtiene el template de contacto.

            const clienteBotonEditar = clienteContenedor.querySelector(".cliente-botones-editar"); // Obtiene el botón de editar cliente.
            clienteBotonEditar.addEventListener("click", () => { // Agrega un event listener para el clic en el botón de editar cliente.
                doEditar(cliente); // Llama a la función para editar el cliente.
            });

            // Llena los campos del cliente en la fila de la lista.
            clienteContenedor.querySelector(".cliente-datos-nombre").textContent = cliente.nombre;
            clienteContenedor.querySelector(".cliente-datos-cif").txtContent = cliente.cif;
            clienteContenedor.querySelector(".cliente-datos-tlf").textContent = cliente.telefono;
            clienteContenedor.querySelector(".cliente-datos-direccion").textContent = cliente.direccion;
            clienteContenedor.querySelector(".cliente-datos-sector").textContent = "Sector: " + cliente.sector;

            // Clona y llena los contactos del cliente.
            cliente.contactos.forEach((contacto, index) => {
                const contactoContenedor = templateContacto.cloneNode(true); // Clona el template de contacto.
                contactoContenedor.classList.remove("hidden"); // Remueve la clase 'hidden' para mostrar el contacto.
                // Llena los campos del contacto.
                contactoContenedor.querySelector(".contacto-nombre").textContent = contacto.nombre + " " + contacto.apellido1 + " " + contacto.apellido2;
                contactoContenedor.querySelector(".contacto-tlf").textContent = contacto.telefono1;
                contactoContenedor.querySelector(".contacto-email").textContent = contacto.email1;
                clientesContactosContenedor.append(contactoContenedor); // Agrega el contacto al contenedor de contactos del cliente.
            });
            contenedorListado.append(clienteContenedor); // Agrega la fila del cliente al contenedor de la lista.
        });
    }

    function doEditar(cliente) { // Define la función para editar un cliente.
        const bloqueFormulario = newBloqueFormulario(); // Crea un nuevo bloque de formulario.
        const clienteFormularioEdicion = bloqueFormulario.querySelector(".cliente-formulario"); // Obtiene el formulario de edición de cliente.
        const contactosContenedor = bloqueFormulario.querySelector(".cliente-contactos-contenedor-formulario"); // Obtiene el contenedor de contactos del formulario.
        const contactoFormulario = contactosContenedor.querySelector("form"); // Obtiene el formulario de contacto.

        const clientesSelectSector = clienteFormularioEdicion.querySelector("[name = 'select-cliente-sector']"); // Obtiene el select de sectores del formulario.

        const botonEnviar = clienteFormularioEdicion.querySelector(".formulario-boton-enviar"); // Obtiene el botón de enviar formulario.

        clienteFormularioEdicion.querySelector("[name = 'input-cliente-id']").value = cliente.id; // Asigna el ID del cliente al campo correspondiente.
        clienteFormularioEdicion.querySelector("[name = 'input-cliente-nombre']").value = cliente.nombre; // Asigna el nombre del cliente al campo correspondiente.
        clienteFormularioEdicion.querySelector("[name = 'input-cliente-cif']").value = cliente.cif; // Asigna el CIF del cliente al campo correspondiente.
        clienteFormularioEdicion.querySelector("[name = 'input-cliente-tlf']").value = cliente.telefono; // Asigna el teléfono del cliente al campo correspondiente.
        clienteFormularioEdicion.querySelector("[name = 'input-cliente-direccion']").value = cliente.direccion; // Asigna la dirección del cliente al campo correspondiente.

        getClientesSectores(clientesSelectSector, cliente.id_sector); // Llama a la función para obtener los sectores de cliente y llenar el select.

        setContactos(); // Llama a la función para establecer los contactos del cliente en el formulario.

        botonEnviar.addEventListener("click", (event) => { // Agrega un event listener para el clic en el botón de enviar formulario.
            event.preventDefault(); // Previene el comportamiento por defecto del formulario.
            new Modal("Seguro que quiere efetuar cambios?", "confirmacion", guardarUpdateCliente, ""); // Muestra un modal para confirmar los cambios.
        });

        const contactoNuevoBtn = document.querySelector(".nuevo-contacto-boton"); // Obtiene el botón para agregar un nuevo contacto en el formulario.
        contactoNuevoBtn.addEventListener("click", (e) => { // Agrega un event listener para el clic en el botón de nuevo contacto.
            e.preventDefault(); // Previene el comportamiento por defecto del enlace.
            const formularioNuevoContacto = contactoFormulario.cloneNode(true); // Clona el formulario de contacto.
            formularioNuevoContacto.classList.remove("hidden"); // Remueve la clase 'hidden' para mostrar el formulario.
            const botonEnviarContactoNuevo = formularioNuevoContacto.querySelector("button.enviar"); // Obtiene el botón de enviar del nuevo contacto.
            contactoNuevoBtn.after(formularioNuevoContacto, contactosContenedor.querySelector("form")); // Inserta el formulario después del botón de nuevo contacto.
            formularioNuevoContacto.querySelector("button.eliminar").remove(); // Remueve el botón de eliminar del nuevo contacto.
            formularioNuevoContacto.querySelector("[name='input-contacto-cliente-id']").value = cliente.id; // Asigna el ID del cliente al campo correspondiente en el formulario de contacto.
            botonEnviarContactoNuevo.addEventListener("click", (e) => { // Agrega un event listener para el clic en el botón de enviar del nuevo contacto.
                e.preventDefault(); // Previene el comportamiento por defecto del formulario.
                new Modal("¿Quieres guardar este contacto?", "confirmacion", guardarNuevoContacto, formularioNuevoContacto); // Muestra un modal para confirmar la creación del contacto.
            });
        });

        function setContactos() { // Define una función para establecer los contactos del cliente en el formulario.
            cliente.contactos.forEach(contacto => { // Itera sobre cada contacto del cliente.
                const nuevoFormularioContacto = contactoFormulario.cloneNode(true); // Clona el formulario de contacto.
                nuevoFormularioContacto.querySelector("[name = 'input-contacto-id']").value = contacto.id; // Asigna el ID del contacto al campo correspondiente.
                nuevoFormularioContacto.querySelector("[name = 'input-contacto-nombre']").value = contacto.nombre; // Asigna el nombre del contacto al campo correspondiente.
                nuevoFormularioContacto.querySelector("[name = 'input-contacto-apellido1']").value = contacto.apellido1; // Asigna el primer apellido del contacto al campo correspondiente.
                nuevoFormularioContacto.querySelector("[name = 'input-contacto-apellido2']").value = contacto.apellido2; // Asigna el segundo apellido del contacto al campo correspondiente.
                nuevoFormularioContacto.querySelector("[name = 'input-contacto-telefono']").value = contacto.telefono1; // Asigna el teléfono del contacto al campo correspondiente.
                nuevoFormularioContacto.querySelector("[name = 'input-contacto-email']").value = contacto.email1; // Asigna el email del contacto al campo correspondiente.
                const botonEnviar = nuevoFormularioContacto.querySelector("button.enviar"); // Obtiene el botón de enviar del formulario de contacto.
                const botonEliminar = nuevoFormularioContacto.querySelector("button.eliminar"); // Obtiene el botón de eliminar del formulario de contacto.
                botonEnviar.addEventListener("click", (event) => { // Agrega un event listener para el clic en el botón de enviar del formulario de contacto.
                    event.preventDefault(); // Previene el comportamiento por defecto del formulario.
                    console.log("enviando cambios de contacto", contacto.id); // Imprime un mensaje en la consola.
                });
                botonEliminar.addEventListener("click", (event) => { // Agrega un event listener para el clic en el botón de eliminar del formulario de contacto.
                    event.preventDefault(); // Previene el comportamiento por defecto del formulario.
                    console.log("eliminando contacto", contacto.id); // Imprime un mensaje en la consola.
                });
                nuevoFormularioContacto.classList.remove("hidden"); // Remueve la clase 'hidden' para mostrar el formulario de contacto.
                contactosContenedor.append(nuevoFormularioContacto); // Agrega el formulario de contacto al contenedor de contactos.
            });
        }

        contenedorListado.innerHTML = ""; // Limpia el contenedor del listado de clientes.
        contenedorListado.append(bloqueFormulario); // Agrega el bloque de formulario al contenedor del listado de clientes.
        bloqueFormulario.classList.remove("hidden"); // Remueve la clase 'hidden' para mostrar el bloque de formulario.
    }

    function getClientesSectores(clientesSelectSector, clienteIdSector) { // Define una función para obtener los sectores de cliente.
        fetch(apiUrlClientesSectoresGet, {method: "GET"}) // Realiza una solicitud GET al servidor para obtener los sectores de cliente.
        .then(respuesta => respuesta.json() // Convierte la respuesta a formato JSON.
        .then(sectores => { // Maneja los datos de los sectores obtenidos.
            sectores.forEach(sector => { // Itera sobre cada sector obtenido.
                const opcionSector = document.createElement("option"); // Crea un elemento option para el select.
                opcionSector.value = sector.id; // Asigna el valor del ID del sector al elemento option.
                opcionSector.textContent = sector.nombre; // Asigna el nombre del sector al elemento option.
                if (clienteIdSector == undefined && sector.id == clienteIdSector) { // Verifica si el ID del sector coincide con el del cliente.
                    opcionSector.setAttribute("selected", "selected"); // Establece el atributo selected en el elemento option.
                }
                clientesSelectSector.append(opcionSector); // Agrega el elemento option al select de sectores.
            });
        }));
    }

    function newBloqueFormulario() { // Define una función para crear un nuevo bloque de formulario.
        const bloqueFormulario = document.querySelector("#bloque-formulario"); // Obtiene el bloque de formulario del DOM.
        bloqueFormulario.id = ""; // Remueve el atributo 'id' del bloque de formulario.
        bloqueFormulario.classList.add("bloque-formulario"); // Agrega una clase al bloque de formulario.
        return bloqueFormulario; // Retorna el bloque de formulario modificado.
    }

    function doNuevoCliente() { // Define la función para agregar un nuevo cliente.
        const bloqueFormulario = newBloqueFormulario(); // Crea un nuevo bloque de formulario.
        const clienteFormularioEdicion = bloqueFormulario.querySelector(".cliente-formulario"); // Obtiene el formulario de cliente del bloque.
        bloqueFormulario.querySelector(".cliente-contactos-contenedor-formulario").remove(); // Elimina el contenedor de contactos del formulario.

        const clientesSelectSector = clienteFormularioEdicion.querySelector("[name = 'select-cliente-sector']"); // Obtiene el select de sectores del formulario.
        const botonNuevoClienteEnviar = clienteFormularioEdicion.querySelector(".formulario-boton-enviar"); // Obtiene el botón de enviar del formulario.

        getClientesSectores(clientesSelectSector, ""); // Llama a la función para obtener los sectores de cliente y llenar el select.

        botonNuevoClienteEnviar.addEventListener("click", (e) => { // Agrega un event listener para el clic en el botón de enviar del formulario.
            e.preventDefault(); // Previene el comportamiento por defecto del formulario.
            new Modal("Quieres dar de alta a este cliente?", "confirmacion", guardarNuevoCliente, ""); // Muestra un modal para confirmar la creación del cliente.
        });

        contenedorListado.innerHTML = ""; // Limpia el contenedor del listado de clientes.
        contenedorListado.append(bloqueFormulario); // Agrega el bloque de formulario al contenedor del listado de clientes.
        bloqueFormulario.classList.remove("hidden"); // Remueve la clase 'hidden' para mostrar el bloque de formulario.

        function guardarNuevoCliente() { // Define la función para guardar un nuevo cliente.
            const datosFormulario = new FormData(clienteFormularioEdicion); // Obtiene los datos del formulario.

            fetch(apiUrlClientesPost, {method: "POST", body: datosFormulario}) // Realiza una solicitud POST al servidor para guardar el nuevo cliente.
            .then((respuesta) => { // Maneja la respuesta de la solicitud.
                if (!respuesta.ok) { // Verifica si la respuesta no es exitosa.
                    throw new Error(`Error en la solicitud: ${respuesta.status}`); // Lanza un error con el mensaje correspondiente.
                }
                return respuesta.json(); // Convierte la respuesta a formato JSON.
            })
            .then((data) => { // Maneja los datos de la respuesta.
                new Modal(data, "informacion", "", ""); // Muestra un modal con un mensaje informativo.
            })
            .catch((error) => { // Maneja los errores ocurridos durante la solicitud.
                const mensajeError = `Error en la solicitud <br> ${error} <br> Consulte con el servicio tecnico MotherFucker`; // Crea un mensaje de error.
                new Modal(mensajeError, "informacion", "", ""); // Muestra un modal con el mensaje de error.
            });
        }
    }

    getClientes(); // Llama a la función para obtener los clientes cuando se carga la página.
}

doClientes(); // Llama a la función principal para iniciar el proceso relacionado con los clientes.
