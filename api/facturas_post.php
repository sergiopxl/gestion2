<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: POST");
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
$respuesta;

$sqlFacturasPost = "INSERT INTO
 `facturas_tb`
 ( `baseimponible`, `recargo`, `iva`, `descripcion`, `fecha_emision`, `fecha_envio`, `fecha_pago`, `id_cliente`, `id_estado`) 
 VALUES 
 ('$baseimponible',0,'$iva','$descripcion','[value-6]','0000-00-00','0000-00-00','$id_cliente',1)";




if ($conn->query($sqlFacturasPost)) {
    // Capturar el nuevo ID de la factura insertada
    $lastInsertedId = $conn->insert_id;

    
    foreach ($data['items'] as $item) {
        $descripcion = $item['descripcion'];
        $importe = $item['importe'];   


    // Ahora, ejecuta la inserción del artículo de la factura
    $sqlItemPost = "INSERT INTO 
    `facturas_items_tb`
    ( `descripcion`, `cantidad`, `importe`, `tipo`, `id_factura`)  
    VALUES
    ('$descripcion',1,' $importe',1,'$lastInsertedId')";

    if ($conn->query($sqlItemPost) === TRUE) {
        // Todo ha sido insertado exitosamente
        $respuesta = json_encode(array("status" => "success", "message" => "Factura y artículo insertados correctamente.", "last_inserted_id" => $lastInsertedId));

    } else {
        // Manejar error en la inserción del artículo
        $respuesta = json_encode(array("status" => "error", "message" => "Error al insertar el artículo de la factura: " . $conn->error));
       
    }
}
} else {
    // Manejar error en la inserción de la factura
    $respuesta = json_encode(array("status" => "error", "message" => "Error al insertar la factura: " . $conn->error));    
}
echo $respuesta;

// Cerrar la conexión
$conn->close();
?>
