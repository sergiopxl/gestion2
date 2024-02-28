<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT");
include("conn/conexion.php");

$data = json_decode(file_get_contents("php://input"),true);

if(!$data){
    echo json_encode(array("succes" => false,"message"=>"Datos JSON no validos"));
    exit;
}

$baseimponible = $data['baseimponible'];
$iva = $data['iva'];
$descripcion = $data['descripcion'];
$id_cliente = $data['id_cliente'];
$importe = $data['importe'];



$sqlFacturaUpdate = "UPDATE facturas_tb SET
baseimponible = $baseimponible,
iva = $iva,
descripcion ='$descripcion'
WHERE id_cliente = $id_cliente";



$respuesta = mysqli_query($conn,$sqlFacturaUpdate);

if($respuesta){
    $mensaje = "Registro actualizado correctamente"; // Mensaje de éxito
} else {
    $mensaje = "Tienes un problema"; // Mensaje de error
}


echo json_encode($mensaje);










