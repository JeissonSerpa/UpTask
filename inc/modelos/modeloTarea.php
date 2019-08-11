<?php

   if(isset($_POST)){
      $idproyecto = $_POST['id'];
      $accion = $_POST['accion'];
      $tarea = $_POST['nombreTarea'];

      if($accion == 'crear'){
         //llamar la conexion
         include_once '../funciones/conexion.php';

         try{
            $stmt = $conn->prepare("INSERT INTO tareas(nombreTarea, idProyecto) VALUE(?, ?)");
            $stmt->bind_param('si', $tarea, $idproyecto);
            $stmt->execute();
            if($stmt->affected_rows > 0){
               $respuesta = [
                  'respuesta' => 'Correcto',
                  'id' => $stmt->insert_id,
                  'accion' => $accion,
                  'tarea' => $tarea
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