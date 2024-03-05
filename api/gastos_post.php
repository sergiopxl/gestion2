<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: POST");
include("conn/conexion.php");
$idProveedor = $_POST["input-id-proveedor"];
$descripcion= $_POST ["descripcion"];
$fechaEmision= $_POST ["fecha"];
$idEstado = $_POST["estado"];
$importe = $_POST["importe"];
$sqlGastos="INSERT INTO `gastos_tb`( `id_empresa`, `descripcion`, `fecha_emision`, `fecha_pago`, `id_estado`, `baseimponible`, `iva`, `archivo`) VALUES
 ($idProveedor,'$descripcion','$fechaEmision','0000-00-00',$idEstado,$importe,21,'')";

 $respuesta = mysqli_query($conn,$sqlGastos);

 if($respuesta){
    echo json_encode("Se ha guardado correctamente");
 }else{
    echo json_encode("No se ha guardado");
 }