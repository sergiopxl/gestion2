<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: POST");
include("conn/conexion.php");

$sqlFacturasPost = "INSERT INTO
 `facturas_tb`
 ( `baseimponible`, `recargo`, `iva`, `descripcion`, `fecha_emision`, `fecha_envio`, `fecha_pago`, `id_cliente`, `id_estado`) 
 VALUES 
 ('[value-2]',0,'[value-4]','[value-5]','[value-6]','0000-00-00','0000-00-00','[value-9]',1)";



if ($conn->query($sqlFacturasPost) === TRUE) {
    // Capturar el nuevo ID de la factura insertada
    $lastInsertedId = $conn->insert_id;

    // Ahora, ejecuta la inserción del artículo de la factura
    $sqlItemPost = "INSERT INTO 
    `facturas_items_tb`
    ( `descripcion`, `cantidad`, `importe`, `tipo`, `id_factura`)  
    VALUES
    ('[value-2]',1,'[value-4]',1,'$lastInsertedId')";

    if ($conn->query($sqlItemPost) === TRUE) {
        // Todo ha sido insertado exitosamente
        echo json_encode(array("status" => "success", "message" => "Factura y artículo insertados correctamente.", "last_inserted_id" => $lastInsertedId));
    } else {
        // Manejar error en la inserción del artículo
        echo json_encode(array("status" => "error", "message" => "Error al insertar el artículo de la factura: " . $conn->error));
    }
} else {
    // Manejar error en la inserción de la factura
    echo json_encode(array("status" => "error", "message" => "Error al insertar la factura: " . $conn->error));
}

// Cerrar la conexión
$conn->close();
?>
