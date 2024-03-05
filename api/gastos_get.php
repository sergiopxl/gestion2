<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: GET");
include("conn/conexion.php");

$sqlGastos = "SELECT gastos_tb.*, proveedores_tb.nombre AS proveedor from gastos_tb LEFT JOIN proveedores_tb ON gastos_tb.id_empresa = proveedores_tb.id WHERE 1";

$respuesta = mysqli_query($conn,$sqlGastos);

if($respuesta){
    $gastos = [];
    while($gasto = mysqli_fetch_assoc($respuesta)){
        $gastos[] = $gasto;
    }
    echo json_encode($gastos);
}else{
    echo json_encode("Error en la consulta");
}

