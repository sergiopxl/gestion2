<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: POST");
include("conn/conexion.php");
$nombre = $_POST["input-contacto-nombre"];
$apellido1 = $_POST["input-contacto-apellido1"];
$apellido2 = $_POST["input-contacto-apellido2"];
$telefono = $_POST["input-contacto-telefono"];
$email = $_POST["input-contacto-email"];
$idCliente = $_POST["input-cliente-id"];
$idContacto = $_POST["input-contacto-id"];


$sqlContactoUpdate = "UPDATE `clientes_contactos_tb` SET 
`nombre`='$nombre',`apellido1`='$apellido1',`apellido2`='$apellido2',`telefono1`='$telefono',`email1`='$email',`id_cliente`= $idCliente WHERE id = $idContacto ";
$resultado = mysqli_query($conn, $sqlContactoUpdate );
if($resultado){
    $mensaje = "Registro actualizado correctamente";

}else{
    $mensaje = "Tienes un problema";    
}
