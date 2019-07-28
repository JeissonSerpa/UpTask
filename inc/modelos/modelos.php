<?php

if(isset($_POST)){
   $nombreUsu = $_POST['usuario'];
   $password = $_POST['pass'];
   $accion = $_POST['accion'];

   if($accion == 'crear'){
      //Crear Usuario
      $opciones = [
         'opcion' => 12
      ];

      $hashPass = password_hash($password, PASSWORD_BCRYPT, $opciones);

      //llamar la conexion
      include_once '../funciones/conexion.php';

      try{
         $stmt = $conn->prepare("INSERT INTO usuarios(usuario, pass) VALUE(?,?)");
         $stmt->bind_param('ss', $nombreUsu, $hashPass);
         $stmt->execute();
         if($stmt->affected_rows > 0){
            $respuesta = [
               'respuesta' => 'Correcto',
               'id' => $stmt->insert_id,
               'accion' => $accion
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
//=========================================================
   if($accion == 'login'){
      //Funcion Login
      include_once '../funciones/conexion.php';

      try{
         $stmt = $conn->prepare("SELECT * FROM usuarios WHERE usuario = ?");
         $stmt->bind_param('s', $nombreUsu);
         $stmt->execute();
         $stmt->bind_result($idUsuario, $nomUsuario, $passUsuario);
         $stmt->fetch();
         if($nomUsuario){
            if(password_verify($password, $passUsuario)){
               $respuesta = [
                  'accion' => $accion,
                  'id' => $idUsuario,
                  'usuario' => $nomUsuario,
                  'respuesta' => 'Correcto',
               ];
            }else{
               $respuesta = [
                  'accion' => $accion,
                  'id' => $idUsuario,
                  'usuario' => $nomUsuario,
                  'respuesta' => 'Login incorrecto',
               ];
            }
            
         }else{
            $respuesta = [
               'respuesta' => 'error'
            ];
         }

      }catch(Exception $e){
         $respuesta = [
            'respuesta' => $e->getMessage()
         ];
      }
      echo json_encode($respuesta);
   }
}

?>