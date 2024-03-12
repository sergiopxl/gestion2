<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, X-User-ID,X-Token, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: POST");
require_once 'conn/conexion.php';

$rutaParaBaseDatos="";

if($_FILES['avatar']){
    $nombreArchivoOriginal = $_FILES['archivo']['name'];
    $tipoArchivo = $_FILES['archivo']['type'];
    $tamañoArchivo = $_FILES['archivo']['size'];
    $rutaTemporal = $_FILES['archivo']['tmp_name'];

    $directorioDestino = '../app/assets/avatares/';

    $nombreArchivoUnico = uniqid() . '_'. $nombreArchivoOriginal;

    $rutaCompletaArchivo = $directorioDestino . $nombreArchivoUnico;


    $rutaParaBaseDatos= "../../assets/avatares/". $nombreArchivoUnico;

    move_uploaded_file($rutaTemporal,$rutaCompletaArchivo);




    

}

$nombre = $_POST["nombre-usuario"];
$email = $_POST["email-usuario"];
$pass = md5($_POST["pass"]);

$SqlInsertUsuario = "INSERT INTO `usuarios_tb`( `username`, `avatar`, `email`, `password`, `id_permiso`) VALUES ('$nombre','$rutaParaBaseDatos','$email','$pass',1)";




$respuesta = mysqli_query($conn, $SqlInsertUsuario);

//Compruebo si la ejecucion de la consulta se ha hecho bien
if($respuesta){
    echo json_encode("El cliente se hizo correctamente");
}else{
    echo json_encode("No ha funcionado");
}