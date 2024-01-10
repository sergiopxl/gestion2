<?php
include("conn/parameters.php");

$conn = mysqli_connect(HOST,USER,PASSWORD) or die ("No se puede conectar");
mysqli_select_db($conn, DATABASE);
mysqli_set_charset($conn, "UTF8");

if($conn->connect_error){
    die("Connection failed: ". $conn->connect_error);
}else{
   // echo"<div> Todo bien </div>";
}

?>