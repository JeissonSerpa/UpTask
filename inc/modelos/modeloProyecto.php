<?php

   if(isset($_POST)){
      $proyecto = $_POST['nombre'];
      $accion = $_POST['accion'];

      if($accion == 'crear'){
         //llamar la conexion
         include_once '../funciones/conexion.php';

         try{
            $stmt = $conn->prepare("INSERT INTO proyectos(nombreProyecto) VALUE(?)");
            $stmt->bind_param('s', $proyecto);
            $stmt->execute();
            if($stmt->affected_rows > 0){
               $respuesta = [
                  'respuesta' => 'Correcto',
                  'id' => $stmt->insert_id,
                  'accion' => $accion,
                  'proyecto' => $proyecto
               ];
            }
            $stmt->close();
            $conn->close();

         }catch(Exception $e){
            $respuesta = [
               'respuesta' => $e->getMessage()
            ];
         }

         echo json_encode($respuesta);
      }
   }
?>