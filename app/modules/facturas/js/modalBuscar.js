class ModalBuscar{
    contenedor = document.createElement("div")
    inputBusqueda = document.createElement("input")
    boton = document.createElement("button")
    resultado = document.createElement("div")
    exit = document.createElement("div")


constructor(){
    this.contenedor.classList.add("modal-contenedor");
    this.inputBusqueda.classList.add("input-modal");
    this.boton.classList.add("btn-modal");
    this.boton.textContent = "Buscar";
    this.resultado.classList.add("resultado-modal");
    this.exit.classList.add("exit-modal");
    this.exit.textContent = "x";

    
    this.boton.addEventListener("click",()=>{
    fetch(apiUrlClientesGet + "?buscar=" + this.inputBusqueda.value,{method:"GET"})
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud no pudo ser completada correctamente.'+response.status);
        }
        return response.json(); // Convertir la respuesta a formato JSON
    })
    .then(respuesta => {
        // Actualizar el valor del input con el cliente obtenido
        //this.inputBusqueda.value = respuesta.clientes;
        const contenedorResultadoClientes = document.createElement("div")
        for (let i = 0; i < respuesta.clientes.length; i++) {
            const cliente = respuesta.clientes[i];
            const divClienteResultadoBusqueda = document.createElement("div");
            divClienteResultadoBusqueda.addEventListener("click",()=>{
               document.querySelector(".cliente-vista span").textContent = cliente.nombre;   
               document.querySelector("[name='input-id-cliente']").value= cliente.id;
               this.destroy();
            })
            divClienteResultadoBusqueda.textContent = cliente.nombre;
            contenedorResultadoClientes.append(divClienteResultadoBusqueda);
        }
        this.contenedor.append (contenedorResultadoClientes);
        
        // Suponiendo que el nombre del cliente es lo que quieres mostrar en el input
    })
    
    
       
    
    })
    

    this.exit.addEventListener("click",()=>{
        this.destroy();
    })
this.contenedor.append(this.exit,this.inputBusqueda,this.boton,this.resultado);
 document.querySelector("body").append(this.contenedor);

}
destroy(){
    this.contenedor.remove();
}
}