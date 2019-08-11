<?php
   function nombrePagina(){
      $archivo = basename($_SERVER['PHP_SELF']);
      $clase = str_replace(".php", "", $archivo);
      return $clase;
   }

   //Querys

   function listadoProyectos(){
      include 'conexion.php';
      try{
         return $conn->query("SELECT * FROM proyectos");
      }catch(Exceptio $e){
         echo 'Error: ' . $e->getMessage;
         return false;
      }
   }

   //obtener proyecto segun ID

   function obtenerProyecto($id = null){
      include 'conexion.php';
      try{
      return $conn->query("SELECT nombreProyecto FROM proyectos WHERE id = {$id}");
      }catch(Exceptio $e){
         echo 'Error: ' . $e->getMessage;
         return false;
      }
   }

   //obtener tareas de los proyectos
   function listadoTareas($id = null){
      include 'conexion.php';
      try{
      return $conn->query("SELECT id, nombreTarea, estadoTarea FROM tareas WHERE idProyecto = {$id}");
      }catch(Exceptio $e){
         echo 'Error: ' . $e->getMessage;
         return false;
      }
   }
?>