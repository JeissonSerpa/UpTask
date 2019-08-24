let contenedorProyectos = document.querySelector('#proyectos');

eventoEscucha();

function eventoEscucha(e){

   //Document ready
   document.addEventListener('DOMContentLoaded', function(){
      actualizarProgreso();
   })

   //evento que crea nuevo proyecto
   let botonCrearProyecto = document.querySelector('.crear-proyecto a');
   botonCrearProyecto.addEventListener('click', crearNuevoProyecto);

   //Evento para agregar tareas
   let botonCrearTarea = document.querySelector('.nueva-tarea');
   if(botonCrearTarea !== null){
      botonCrearTarea.addEventListener('click', agregarNuevaTarea);
   }

   //Evento para editar o eliminar tareas
   let contenedorTareas = document.querySelector('.listado-pendientes');
   contenedorTareas.addEventListener('click', modificarTarea);
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

//funcion que agrega las tareas Nuevas

function agregarNuevaTarea(e){
   e.preventDefault();
   let nombretarea = document.querySelector('.nombre-tarea').value;
   let idProyecto = document.querySelector('#idProyecto').value;
   let contenedorTareas = document.querySelector('#tareas');
   if(nombretarea === ''){
      Swal.fire({
         title: 'Error!',
         type: 'error',
         text: 'La Tarea no Puede Estar Vacía'
      })
   }else{
      //insertar en php

      //Se crea el objeto AJAX
      xhr = new XMLHttpRequest();

      //almacenar datos a enviar

      let datos = new FormData();
      datos.append('id', idProyecto);
      datos.append('nombreTarea', nombretarea);
      datos.append('accion', 'crear');

      //se abre la conexion
      xhr.open('POST', 'inc/modelos/modeloTarea.php', true);

      //Respuesta desde php
      xhr.onload = function(){
         if(this.status === 200){
            let respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta);
            let tarea = respuesta.tarea,
               id = respuesta.id,
               estatus = respuesta.respuesta;

            if(estatus === 'Correcto'){
               Swal.fire({
                  type: 'success',
                  title: 'Tarea Creada!',
                  text: 'La Tarea: ' + tarea + ' se Creo Correctamente'
                  //footer: '<a href>Why do I have this issue?</a>'
               })

               //Eliminar Tarea Vacia
               let noTareaAll = document.querySelectorAll('#noTarea');
               if(noTareaAll.length !== 0){
                  document.querySelector('#noTarea').remove();
               }

               //crear el elemento con la tarea nueva
               let nuevaTarea = document.createElement('li');
               nuevaTarea.id = `tare:${id}`;
               nuevaTarea.classList.add('tarea');
               
               //unir con el html
               nuevaTarea.innerHTML = `
                  <p>${tarea}</p>
                  <div class="acciones">
                     <i class="far fa-check-circle"></i>
                     <i class="fas fa-trash"></i>
                  </div>
               `;

               //agreagar al ul padre
               contenedorTareas.appendChild(nuevaTarea);
               document.querySelector('.agregar-tarea').reset();
               actualizarProgreso();
            }else{
               Swal.fire({
                  type: 'error',
                  title: 'Error!',
                  text: 'huvo un erro no se inserto la tarea'
                  //footer: '<a href>Why do I have this issue?</a>'
               })
            }
         }
      }

      //enviar los datos
      xhr.send(datos);
   }
}

function modificarTarea(e){
   e.preventDefault();

   if(e.target.classList.contains('fa-check-circle')){
      if(e.target.classList.contains('completo')){
         e.target.classList.remove('completo')
         cambiarTarea(e.target, 0);
      }else{
         e.target.classList.add('completo')
         cambiarTarea(e.target, 1);
      }
   }
   if(e.target.classList.contains('fa-trash')){
      Swal.fire({
         title: 'Eliminar Tarea?',
         text: "Si Elimina la Tarea no Podra Recuperarla!",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Si, Eliminar!',
         cancelButtonText: 'Cancelar'
       }).then((result) => {
         if (result.value) {
            let tareaEliminar = e.target.parentElement.parentElement;

            //Eliminar tarea de la base de datos
            eliminarTareaDB(tareaEliminar);

            //Eliminar tarea del HTML
            tareaEliminar.remove();

           Swal.fire(
             'Eliminada!',
             'La Tarea se Elimino Correctamente.',
             'success'
           )
         }
       })
   }
}

function cambiarTarea(tarea, estado){
   let idTarea = tarea.parentElement.parentElement.id.split(':');
   
   //crear objeto AJAX
   let xhr = new XMLHttpRequest();

   //almacenar los datos
   let datos = new FormData();
   datos.append('id', idTarea[1]);
   datos.append('estado', estado);
   datos.append('accion', 'editar');

   //abrir la coneccion
   xhr.open('POST', 'inc/modelos/modeloTarea.php', true);

   //obtener la respuesta
   xhr.onload = function(){
      if(this.status === 200){
         let respuesta = (xhr.responseText);
         actualizarProgreso();
      }else{
         console.log(this.status);
      }
   }

   //Enviar los datos
   xhr.send(datos);
}

//Funcion para eliminar tarea

function eliminarTareaDB(tarea){
   let idTarea = tarea.id.split(':');
   
   //crear objeto AJAX
   let xhr = new XMLHttpRequest();

   //almacenar los datos
   let datos = new FormData();
   datos.append('id', idTarea[1]);
   datos.append('accion', 'eliminar');

   //abrir la coneccion
   xhr.open('POST', 'inc/modelos/modeloTarea.php', true);

   //obtener la respuesta
   xhr.onload = function(){
      if(this.status === 200){
         let respuesta = JSON.parse(xhr.responseText);
         actualizarProgreso();

         //Mensaje sintareas
         let mensajeTareas = document.querySelectorAll('li.tarea');
         let contenedorTareas = document.querySelector('.listado-pendientes ul');

         if(mensajeTareas.length === 0){
            contenedorTareas.innerHTML = `<li class='tarea' id='noTarea'>
                                             <p>No hay Tareas Disponibles</p>
                                          <li>`;
         }
      }else{
         console.log(this.status);
      }
   }

   //Enviar los datos
   xhr.send(datos);
}

function actualizarProgreso(){
   let tareas = document.querySelectorAll('ul .tarea').length;
   let completos = document.querySelectorAll('li .completo').length;
   let porcentajeAvance = Math.round((completos/tareas)*100);
   let porcentajeBarra = document.querySelector('#porcentaje');

   porcentajeBarra.style.width = porcentajeAvance+'%';

   if(porcentajeAvance === 100){
      Swal.fire({
         type: 'success',
         title: 'Proyecto Completado!',
         text: 'Completaste Todas las tareas del Proyecto'
         //footer: '<a href>Why do I have this issue?</a>'
      })
   }
}