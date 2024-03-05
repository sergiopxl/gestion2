"use strict"
console.log("gastos.js 1.1");

function initGastos(){
    const contenedor = document.querySelector(".contenedor");
    const templateRow = document.querySelector("#template-row");
    const templateForm = document.querySelector("#template-form");
    const  botonNuevoGasto= document.querySelector("#boton-nuevo");
    botonNuevoGasto.addEventListener("click", e=>{
        e.preventDefault()
        nuevoGasto()

    })
    getGastos()

    function getGastos(){
        fetch(apiUrlGastosGet,{method : "GET"}).then(response=>{
            if(!response.ok){
                throw new Error("Error en listado" + response.statusText);
            }
            response.json().then(data=>{
                printListado(data)
            })
        }).catch(error=>{
            new Modal(error,"informacion","","")
        })

    }
    function printListado(gastos){
        gastos.forEach(gasto => {
            const rowGasto = templateRow.cloneNode(true);
            rowGasto.id="";
            rowGasto.classList.remove("hidden");
            rowGasto.classList.add("row-gasto");
            rowGasto.querySelector(".id-gasto").textContent = gasto.id;
            rowGasto.querySelector(".descripcion-gasto").textContent = gasto.descripcion;
            rowGasto.querySelector(".fecha-gasto").textContent = gasto.fecha_emision;
            rowGasto.querySelector(".estado-gasto").textContent = gasto.estado;
            rowGasto.querySelector(".boton-editar").addEventListener("click",e=>{
                e.preventDefault();
                editarGasto(gasto);
            })
            contenedor.append(rowGasto)



        })
    }
    function nuevoGasto(){
        contenedor.innerHTML = "";
        const formulario = templateForm.cloneNode(true);
        formulario.id="";
        formulario.classList.remove("hidden")
        const botonGuardar = formulario.querySelector(".boton-guardar");
        botonGuardar.addEventListener("click", e=>{
            e.preventDefault();
            guardarGasto(apiUrlGastosPost,formulario)
        });
        const botonBuscarProveedor = formulario.querySelector("#buscar-proveedor-btn")
    botonBuscarProveedor.addEventListener("click", (e) => {
        e.preventDefault();
      new ModalBuscar();

    })
        
        contenedor.append(formulario);
        formulario.querySelector("[name='fecha']").value= actualizarInputFecha();

        function actualizarInputFecha() {
            const fechaActual = new Date();
            const año = fechaActual.getFullYear();
            const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2); // Agrega un cero delante si es necesario
            const dia = ('0' + fechaActual.getDate()).slice(-2); // Agrega un cero delante si es necesario
        
            const fechaFormateada = `${año}-${mes}-${dia}`;
        
            return fechaFormateada;
          }
    }
    function editarGasto(gasto){
        contenedor.innerHTML = "";
        const formulario = templateForm.cloneNode(true);
        formulario.id= ""
        formulario.classList.remove("hidden");
        formulario.querySelector(".proveedor-vista").textContent = gasto.proveedor;
        formulario.querySelector('[name="input-id-proveedor"]').value = gasto.id_empresa;
        formulario.querySelector('[name="descripcion"]').value = gasto.descripcion;
        formulario.querySelector('[name="importe"]').value = gasto.baseimponible;
        formulario.querySelector('[name="fecha"]').value = gasto.fecha_emision;
        formulario.querySelector('[name="id-gasto"]').value = gasto.id;

        if(gasto.id_estado == 0){
            formulario.querySelector('[name="estado"] > option[value="0"]').setAttribute("selected","selected")
        }else{
            formulario.querySelector('[name="estado"] > option[value="1"]').setAttribute("selected","selected")
        }
        const botonGuardar = formulario.querySelector(".boton-guardar")
        
        botonGuardar.addEventListener("click",e=>{
            e.preventDefault()
            guardarGasto(apiUrlGastosUpdate,formulario);
        })
        contenedor.append(formulario);
        
    }

    function guardarGasto(url,formulario){
        const datos = new FormData(formulario)
        fetch(url,{method:'POST',body : datos}).then(response=>{
            if(!response.ok){
                throw new Error("Error en el alta" + response.statusText)
            }
            response.json().then(data=>{
                new Modal(data,"informacion","","")
            })
        })
    }
    
}

initGastos()