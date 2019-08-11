eventoEscucha();

let contenedorProyectos = document.querySelector('#proyectos');

function eventoEscucha(e){
   let botonCrearProyecto = document.querySelector('.crear-proyecto a');
   botonCrearProyecto.addEventListener('click', crearNuevoProyecto);
}

function crearNuevoProyecto(e){
   e.preventDefault();

   //se crea un input con para el nombre del nuevo proyecto
   nuevoProyecto = document.createElement('li');
   nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
   contenedorProyectos.appendChild(nuevoProyecto);
   enfocar = document.querySelector('#nuevo-proyecto');
   enfocar.focus();

   //seleccionar el id con el nuevo proyecto y se agrega con un enter

   let idProyectoNuevo = document.querySelector('#nuevo-proyecto');
   idProyectoNuevo.addEventListener('keypress', function(e){
      let tecla = e.keyCode;

      if(tecla === 13){
         guardarNuevoProyecto(idProyectoNuevo.value);
         contenedorProyectos.removeChild(nuevoProyecto);
      }
   });
}

function guardarNuevoProyecto(nombreProyecto){

   //Crear llamado a AJAX

   let xhr = new XMLHttpRequest();

   //recolectar datos

   let datos = new FormData();
   datos.append('nombre', nombreProyecto);
   datos.append('accion', 'crear');

   //abrir la conexion
   xhr.open('POST', 'inc/modelos/modeloProyecto.php', true);

   //retornar informacion
   xhr.onload = function(){
      if(this.status === 200){
         let respuesta = JSON.parse(xhr.responseText);
         let idProyecto = respuesta.id,
            resultado = respuesta.respuesta,
            accion = respuesta.accion,
            phpProyecto = respuesta.proyecto;
         if(resultado === 'Correcto'){
            let nuevoProyecto = document.createElement('li');
            nuevoProyecto.innerHTML = `
               <a href="index.php?idRespuesta=${idProyecto}" id="${idProyecto}">
                  ${phpProyecto}
               </a>
            `;
            contenedorProyectos.appendChild(nuevoProyecto);
            Swal.fire({
               type: 'success',
               title: 'Proyecto Creado!',
               text: 'El Proyecto: ' + phpProyecto + ' se Creo Correctamente'
               //footer: '<a href>Why do I have this issue?</a>'
             })
             .then(resultado => {
                if(resultado.value){
                  window.location.href = `index.php?idRespuesta=${idProyecto}`;
                }
             })
            
         }else{
            Swal.fire({
               type: 'error',
               title: 'Error!',
               text: 'huvo un erro no se inserto el registro'
               //footer: '<a href>Why do I have this issue?</a>'
             })
         }
      }
   }

   //enviar datos
   xhr.send(datos);

}