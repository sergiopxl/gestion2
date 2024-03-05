<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: POST");
include("conn/conexion.php");

$id = $_POST["id-gasto"];
$idProveedor = $_POST["input-id-proveedor"];
$descripcion= $_POST ["descripcion"];
$fechaEmision= $_POST ["fecha"];
$idEstado = $_POST["estado"];
$importe = $_POST["importe"];


$sqlGastosUpdate= "UPDATE `gastos_tb` SET `id_empresa`=$idProveedor, `descripcion`='$descripcion', `fecha_emision`='$fechaEmision', `baseimponible`=$importe WHERE id = $id ";

  $respuesta = mysqli_query($conn, $sqlGastosUpdate);

  if($respuesta){
    echo json_encode("Se ha guardado correctamente");
 }else{
    echo json_encode("No se ha guardado");
 }

