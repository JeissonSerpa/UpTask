<?php

   if(isset($_POST)){
      if(isset($_POST['id'])){
         $idproyecto = $_POST['id'];
      }
      if(isset($_POST['accion'])){
         $accion = $_POST['accion'];
      }
      if(isset($_POST['nombreTarea'])){
         $tarea = $_POST['nombreTarea'];
      }
      if(isset($_POST['estado'])){
         $estado = $_POST['estado'];
      }

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

      //Editar estado de la tarea
      if($accion == 'editar'){
         //llamar la conexion
         include_once '../funciones/conexion.php';

         try{
            $stmt = $conn->prepare("UPDATE tareas SET estadoTarea = ? WHERE id = ?");
            $stmt->bind_param('ii', $estado, $idproyecto);
            $stmt->execute();
            if($stmt->affected_rows > 0){
               $respuesta = [
                  'respuesta' => 'Correcto',
                  'accion' => $accion,
               ];
            }else{
               $respuesta = [
                  'respuesta' => 'Incorrecto',
                  'accion' => $accion,
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
      //Eliminar Tarea
      if($accion == 'eliminar'){
         //llamar la conexion
         include_once '../funciones/conexion.php';

         try{
            $stmt = $conn->prepare("DELETE FROM tareas WHERE id = ?");
            $stmt->bind_param('i', $idproyecto);
            $stmt->execute();
            if($stmt->affected_rows > 0){
               $respuesta = [
                  'respuesta' => 'Correcto',
                  'accion' => $accion,
               ];
            }else{
               $respuesta = [
                  'respuesta' => 'Incorrecto',
                  'accion' => $accion,
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