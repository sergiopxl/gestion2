<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: GET");
include("conn/conexion.php");

$respuesta = [];
$error = false;

$gastos = [];
$sqlGastos = "SELECT gastos_tb.*, proveedores_tb.nombre AS proveedor FROM `gastos_tb` LEFT JOIN proveedores_tb ON gastos_tb.id_empresa = proveedores_tb.id WHERE 1";
$respuestaGastos = mysqli_query($conn, $sqlGastos);
while ($gasto = mysqli_fetch_assoc($respuestaGastos)) {
    $gastos[]=$gasto;
} echo json_encode($gastos);
