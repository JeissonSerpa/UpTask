eventoEscucha();

let contenedorProyectos = document.querySelector('#proyectos');

function eventoEscucha(e){
   let botonCrearProyecto = document.querySelector('.crear-proyecto a');
   botonCrearProyecto.addEventListener('click', crearNuevoProyecto);
}

function crearNuevoProyecto(e){
   e.preventDefault();

   //se crea un input con para el nombre del nuevo proyecto
   nuevoProtecto = document.createElement('li');
   nuevoProtecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
   contenedorProyectos.appendChild(nuevoProtecto);

   //seleccionar el id con el nuevo proyecto y se agrega con un enter

   let idProyectoNuevo = document.querySelector('#nuevo-proyecto');
   idProyectoNuevo.addEventListener('keypress', function(e){
      let tecla = e.keyCode;

      if(tecla === 13){
         guardarNuevoProyecto(idProyectoNuevo.value);
         contenedorProyectos.removeChild(nuevoProtecto);
      }
   });
}

function guardarNuevoProyecto(nombreProyecto){
   console.log(nombreProyecto);
}