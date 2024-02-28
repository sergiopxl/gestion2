<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT");
include("conn/conexion.php");

$data = json_decode(file_get_contents("php://input"),true);


$id=$data['id'];

$sqlFacturaDelete ="DELETE FROM `facturas_items_tb` WHERE id = $id";

$respuesta = mysqli_query($conn,$sqlFacturaDelete);

if($respuesta){
    $mensaje= "Registro actualizado correctamente"; // Mensaje de éxito
} else {
    $mensaje = "Tienes un problema"; // Mensaje de error
}
echo json_encode($mensaje);

?>













    
   



