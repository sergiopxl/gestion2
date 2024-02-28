<?php
// Establece el tipo de contenido como JSON para la respuesta.
header('Content-Type: application/json');
// Establece los encabezados para permitir el acceso desde cualquier origen.
header("Access-Control-Allow-Origin: *");
// Establece los encabezados permitidos.
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID, X-Token, Accept, Accept-Encoding");
// Establece los métodos permitidos.
header("Access-Control-Allow-Methods: POST");
// Incluye el archivo de conexión a la base de datos.
include("conn/conexion.php");

// Recupera los datos del formulario enviado por POST.
$nombre = $_POST["input-cliente-nombre"];
$cif = $_POST["input-cliente-cif"];
$telefono = $_POST["input-cliente-tlf"];
$direccion = $_POST["input-cliente-direccion"];
$idSector = $_POST["select-cliente-sector"];

// Construye la consulta SQL para insertar un nuevo cliente en la base de datos.
$sqlClientesNew = "INSERT INTO `clientes_tb`( `nombre`, `cif`, `direccion`, `cp`, `provincia`, `poblacion`, `telefono`, `web`, `descripcion`, `cuenta`, `activo`, `id_sector`, `id_origen`, `id_servicio`, `id_usuario`)
VALUES
('$nombre','$cif','$direccion','','','','$telefono','','','',1,$idSector,1,1,1)";

// Ejecuta la consulta SQL para insertar un nuevo cliente.
$respuesta = mysqli_query($conn,$sqlClientesNew);

// Verifica si la consulta se ejecutó con éxito.
if($respuesta){
    $mensaje = "Creado correctamente"; // Establece un mensaje de éxito.
} else {
    $mensaje = "Tienes un problema"; // Establece un mensaje de error.
}
echo json_encode($mensaje); // Devuelve el mensaje en formato JSON.
?>
