<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: POST");
include("conn/conexion.php");

$idProveedor = $_POST["input-proveedor-id"];
$nombreProveedor = $_POST["input-proveedor-nombre"];
$cifProveedor = $_POST["input-proveedor-cif"];
$telefonoProveedor = $_POST["input-proveedor-tlf"];
$direccionProveedor = $_POST["input-proveedor-direccion"];
$servicioProveedor = $_POST["select-proveedor-servicio"];

$sqlProveedorUpdate = "UPDATE proveedores_tb SET

nombre = '$nombreProveedor',
cif = '$cifProveedor',
telefono = '$telefonoProveedor',
direccion = '$direccionProveedor',
id_servicio = $servicioProveedor WHERE id = $idProveedor";

$respuesta = mysqli_query($conn, $sqlProveedorUpdate);
if ($respuesta) {
    $mensaje = "Registro actualizado correctamente";
    
}else{
    $mensaje = "Registro no se pudo actualizar correctamente";

}
echo json_encode($mensaje);
