<?php
// Establece el encabezado para indicar que el contenido es JSON
header('Content-Type: application/json');
// Permite solicitudes de cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
// Define los encabezados permitidos en la solicitud
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
// Define los métodos HTTP permitidos para esta solicitud
header("Access-Control-Allow-Methods: POST");

// Incluye el archivo de conexión a la base de datos
include("conn/conexion.php");

// Obtiene los datos del formulario enviado por POST
$nombre = $_POST["input-cliente-nombre"];
$cif = $_POST["input-cliente-cif"];
$telefono = $_POST["input-cliente-tlf"];
$direccion = $_POST["input-cliente-direccion"];
$idSector = $_POST["select-cliente-sector"];
$idCliente = $_POST["input-cliente-id"];

// Query SQL para actualizar el cliente en la base de datos
$sqlClienteUpdate = "UPDATE clientes_tb SET
nombre = '$nombre',
cif = '$cif',
telefono = $telefono,
direccion = '$direccion',
id_sector = '$idSector' WHERE id = $idCliente";

// Ejecuta la consulta SQL
$respuesta = mysqli_query($conn,$sqlClienteUpdate);

// Verifica si la consulta se ejecutó correctamente
if($respuesta){
    $mensaje = "Registro actualizado correctamente"; // Mensaje de éxito
} else {
    $mensaje = "Tienes un problema"; // Mensaje de error
}

// Convierte el mensaje a formato JSON y lo imprime
echo json_encode($mensaje);
?>
