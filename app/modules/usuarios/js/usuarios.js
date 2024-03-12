"use strict"
function initUsuarios(){
    const titulo = document.querySelector("#h1-apartado");
    titulo.textContent = "Listado usuarios";

    const container = document.querySelector("main");
    const usuarioRow = document.querySelector("#usuario-row");
    const formulario = document.querySelector("#usuario-form");

    const botonNuevoUsuario = document.querySelector("#nuevo-usuario-btn");

    botonNuevoUsuario.addEventListener("click", ()=>{
        doNuevoUsuario();
    });

    getUsuarios();


    function getUsuarios(){
        fetch(apiUrlUsuariosGet, {method:"GET"}).then((response) => {
            if(!response.ok){
                throw new Error("Error en listado" + response.statusText)
            }
            response.json().then(data =>{
                printListado(data)
            })
        }).catch(error => {
            alert(error)
        })
    }
    function printListado(usuarios){
        usuarios.forEach(usuario => {
            const rowUsuario = usuarioRow.cloneNode(true);
            rowUsuario.id="";
            rowUsuario.classList.remove("hidden");
            


            rowUsuario.querySelector(".usuario-id").textContent = usuario.id;
            rowUsuario.querySelector(".usuario-nombre").textContent = usuario.nombre;
            rowUsuario.querySelector(".usuario-email").textContent = usuario.email;
            rowUsuario.querySelector(".usuario-role").textContent = usuario.role;
            rowUsuario.querySelector("img").src= usuario.avatar;
            rowUsuario.querySelector(".editar-usuario").addEventListener("click",()=>editarUsuario(usuario))           


            
            container.append(rowUsuario)

        })
    }
    function doNuevoUsuario(){
        container.innerHTML="";
        const formularioNuevoUsuario = formulario.cloneNode(true);
        formularioNuevoUsuario.id="";
        formularioNuevoUsuario.classList.remove("hidden");

        const botonGuardar = formularioNuevoUsuario.querySelector(".boton-guardar-form")
        botonGuardar.addEventListener("click", e => {
            e.preventDefault();
            guardarUsuario(apiUrlUsuariosPost,formularioNuevoUsuario)
        });
        container.append(formularioNuevoUsuario);      
        
    }
    function guardarUsuario(apiUrl,formularioNuevoUsuario){
        console.log(formularioNuevoUsuario)
        const datos = new FormData(formularioNuevoUsuario);

        const archivo = formularioNuevoUsuario.querySelector('input[type="file"]').files[0];

        datos.append("archivo",archivo);


        fetch(apiUrl,{method: 'POST', body:datos}).then(response => {
           return response.json();
            
        })
        .then((data)=>{
            new Modal(data,"informacion","","");
        })
    }
    

    





}
initUsuarios()