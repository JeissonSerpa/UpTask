<?php

   function usuarioLogueado(){
      if(!validacionLogueo()){
         header('location: login.php');
         exit();
      }
   }

   function validacionLogueo(){
      return isset($_SESSION['usuario']);
   }
   session_start();
   usuarioLogueado();

?>