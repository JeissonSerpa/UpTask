<?php
   function nombrePagina(){
      $archivo = basename($_SERVER['PHP_SELF']);
      $clase = str_replace(".php", "", $archivo);
      return $clase;
   }
?>