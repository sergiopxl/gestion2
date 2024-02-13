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


    this.boton.addEventListener("click",()=>{
        alert("holas")
        



    })
this.contenedor.append(this.exit,this.inputBusqueda,this.boton,this.resultado);
 document.querySelector("body").append(this.contenedor);
}


}