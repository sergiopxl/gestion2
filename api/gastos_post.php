<?php
header('Content-Type: application/json');
header("Acceso-Control-Allow-Origin: *");
header("Acceso-Control-Allow-Headers: X_Requested-With, Content_Type,  Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
header("Acceso-Control-Allow-Methods: POST");
include("conn/conexion.php");

$data = json_decode(file_get_contents("php://input"), true);//decodifica el JSOn recibido y lo convierte en un array assoc

if(!$data){//comprueba si se pudo decodificar el JSON, sino, msj error
    echo json_encode(array("succes" => false, "message" => "Datos JSON no validos"));
    exit;
}
$importe = $data['importe'];
$estado = $data['estado'];
$descripcion = $data['descripcion'];
$id_proveedor = $data['id_provedor'];
//INSERT INTO `gastos_tb`(`id`, `id_empresa`, `descripcion`, `fecha_emision`, `fecha_pago`, `id_estado`, `baseimponible`, `iva`, `archivo`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]')
$sqlGastosPost = 
"INSERT INTO
 `gastos_tb`( `id_empresa`, `descripcion`, `fecha_emision`, `fecha_pago`, `id_estado`, `baseimponible`, `iva`, `archivo`)
VALUES
($id_proveedor, '$descripcion', '0000-00-00', '0000-00-00', $estado, $importe, 0, 0)"; 

$resultado = mysqli_query($conn, $sqlGastosPost);
if($resultado){
    echo json_encode("Se ha guardado correctamente");
}else{
    echo json_encode("No se pudo guardar el gasto");
}

