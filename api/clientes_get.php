<?php
// Establece el tipo de contenido como JSON para la respuesta.
header('Content-Type: application/json');
// Establece los encabezados para permitir el acceso desde cualquier origen.
header("Access-Control-Allow-Origin: *");
// Establece los encabezados permitidos.
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID, X-Token, Accept, Accept-Encoding");
// Establece los métodos permitidos.
header("Access-Control-Allow-Methods: GET");
// Incluye el archivo de conexión a la base de datos.
include("conn/conexion.php");

// Define la condición inicial para la consulta.
$condicion = " WHERE activo = 1 ";
$limite = "";

// Verifica si se proporciona un valor para el inicio de la paginación.
if (isset($_GET["inicio"])){
    $inicio = $_GET["inicio"];
} else {
    $inicio = 0;
}

// Verifica si se proporciona un término de búsqueda.
if(isset($_GET["buscar"])){
    $buscar = $_GET["buscar"];
    // Modifica la condición de la consulta para incluir el término de búsqueda.
    $condicion = " WHERE activo = 1 AND (clientes_tb.nombre LIKE '%$buscar%' OR clientes_tb.cif LIKE '%$buscar%' ) ";
}

// Verifica si se proporciona un valor para el número de resultados por página.
if (isset($_GET["porpagina"])) {
    $porPagina = $_GET["porpagina"];
} else {
    $porPagina = 30; // Establece un valor por defecto para el número de resultados por página.
}
// Construye la parte de la consulta que limita los resultados.
$limite = " LIMIT $inicio, $porPagina ";

$respuesta = [];

// Realiza una consulta para obtener el número total de registros.
$sqlNumeroRegistros = "SELECT COUNT(*) AS numero_registros FROM clientes_tb WHERE activo = 1";
$respuestaNumeroRegistros = mysqli_query($conn,$sqlNumeroRegistros);

// Obtiene el número total de registros y lo agrega a la respuesta.
$fila =mysqli_fetch_assoc($respuestaNumeroRegistros);
$respuesta["numero_registros"] = $fila['numero_registros'];

// Realiza la consulta para obtener los clientes con sus contactos.
$sqlClientes = "SELECT clientes_tb.*, clientes_sectores_tb.nombre AS sector FROM clientes_tb 
 LEFT JOIN clientes_sectores_tb ON clientes_tb.id_sector = clientes_sectores_tb.id $condicion ORDER BY clientes_tb.id DESC $limite  ";
$resultadoClientes = mysqli_query($conn,$sqlClientes);

$clientes = [];
// Itera sobre los resultados de la consulta de clientes.
while($cliente = mysqli_fetch_assoc($resultadoClientes)){
    // Para cada cliente, consulta sus contactos.
    $sqlContactos= "SELECT * FROM clientes_contactos_tb WHERE id_cliente = " . $cliente["id"];
    $resultadoContactos= mysqli_query($conn,$sqlContactos);
    $contactos = [];
    // Itera sobre los resultados de la consulta de contactos.
    while($contacto = mysqli_fetch_assoc($resultadoContactos)){
        $contactos[] = $contacto; // Agrega el contacto al array de contactos.
    }
    $cliente["contactos"]= $contactos; // Agrega el array de contactos al cliente.
    $clientes[] = $cliente; // Agrega el cliente al array de clientes.
}
$respuesta["clientes"] = $clientes; // Agrega el array de clientes a la respuesta.
echo json_encode($respuesta); // Devuelve la respuesta en formato JSON.
?>
