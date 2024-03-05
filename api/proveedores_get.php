<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: GET");
include("conn/conexion.php");
$limite = " ";
$condicion = " WHERE 1 ";
if(isset($_GET["inicio"])){
    $inicio = $_GET["inicio"];
    $porPagina = $_GET["porpagina"];
    
    $limite = " LIMIT $inicio, $porPagina ";
}


$respuesta=[];
if(isset($_GET["buscar"])){
    $buscar = $_GET["buscar"];
    $condicion = " WHERE proveedores_tb.nombre LIKE '%".$buscar."%' OR proveedores_tb.cif LIKE '%".$buscar."%' ";
}

$sqlProveedores="SELECT proveedores_tb.*,proveedores_servicios_tb.name AS servicio FROM proveedores_tb  
LEFT JOIN proveedores_servicios_tb ON proveedores_tb.id_servicio = proveedores_servicios_tb.id $condicion ORDER BY proveedores_tb.id DESC $limite  ";
$respuestaProveedores = mysqli_query($conn,$sqlProveedores);

$sqlNumeroRegistros = "SELECT COUNT(*) AS numero_registros FROM proveedores_tb WHERE 1";
$respuestaNumeroRegistros = mysqli_query($conn,$sqlNumeroRegistros);

$fila =mysqli_fetch_assoc($respuestaNumeroRegistros);
$respuesta["numero_registros"] = $fila['numero_registros'];

$proveedores=[];
while($proveedor = mysqli_fetch_assoc($respuestaProveedores)){

    $sqlContactos= "SELECT * FROM proveedores_contactos_tb WHERE id_proveedor = " . $proveedor["id"];
    $resultadoContactos= mysqli_query($conn,$sqlContactos);
    $contactos = [];
    while($contacto = mysqli_fetch_assoc($resultadoContactos)){
        $contactos[] = $contacto;
    }
    $proveedor["contactos"] = $contactos;
    $proveedores[] = $proveedor;

    //?inicio=1&porpagina=10
   

}
 
$respuesta["proveedores"]= $proveedores;

echo json_encode($respuesta);


?>

