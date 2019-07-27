<?php
   $host = 'localhost';
   $usuario = 'root';
   $pass = '';
   $db = 'uptask';

   $conn = new mysqli($host, $usuario, $pass, $db);
   $conn->set_charset('utf8');
?>