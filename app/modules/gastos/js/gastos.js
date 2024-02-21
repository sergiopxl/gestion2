function getGastos() {
    fetch(apiUrlGastosGet, //con esta linea me conecto con el php
      { method: "GET" })//aca se config el verbo para pedir o enviar etc
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error en la solicitud: ${respuesta.status}`)
        }
        respuesta.json()
          .then((gastos) => { 
            //console.log(gastos); 
            printGastos(gastos) 
            })

      })
    
}
function printGastos(gastos){
    gastos.forEach(gasto => {
        console.log(gasto)
    });
}