eventoEscucha();

function eventoEscucha(){
   const formulario = document.querySelector('#formulario');
   formulario.addEventListener('submit', validacionFormulario);
}

function validacionFormulario(e){
   e.preventDefault();
   let   usuario = document.querySelector('#usuario').value,
         pass = document.querySelector('#password').value,
         accion = document.querySelector('#tipo').value;
   if(usuario === '' || pass === ''){
      Swal.fire({
         type: 'error',
         title: 'Error!',
         text: 'Por favor ingrese usuario y contraseña'
         //footer: '<a href>Why do I have this issue?</a>'
       })
   }else{
      //ejecutar AJAX
      //Datos que se envian al servidor
      let datos = new FormData();
      datos.append('usuario', usuario);
      datos.append('pass', pass);
      datos.append('accion', accion);
      
      //Crear Objeto AJAX

      let xhr = new XMLHttpRequest();

      //Se crea la conexion
      xhr.open('POST', 'inc/modelos/modelos.php', true);

      //Retornar datos
      xhr.onload = function(){
         if(this.status === 200){
            let respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta);
            //validando la respuesta
            if(respuesta.respuesta === 'Correcto'){
               //Respuesta para crear usu
               if(respuesta.accion === 'crear'){
                  Swal.fire({
                     type: 'success',
                     title: 'Correcto!',
                     text: 'Su usuario fue creado correctamente'
                     //footer: '<a href>Why do I have this issue?</a>'
                   })
               }else if(respuesta.accion === 'login'){
                  Swal.fire({
                     type: 'success',
                     title: 'Login Correcto!',
                     text: 'Precione OK para Ingresar'
                     //footer: '<a href>Why do I have this issue?</a>'
                   })
                   .then(resultado=>{
                      if(resultado.value){
                         window.location.href = 'index.php';
                      }
                   })
               }
            }else{
               Swal.fire({
                  type: 'error',
                  title: 'Error!',
                  text: 'Hubo un error'
                  //footer: '<a href>Why do I have this issue?</a>'
                })
            }
         }
      }

      //enviar los datos
      xhr.send(datos);
   }
}