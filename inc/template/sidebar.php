<aside class="contenedor-proyectos">
   <div class="panel crear-proyecto">
      <a href="#" class="boton">Nuevo Proyecto <i class="fas fa-plus"></i> </a>
   </div>

   <div class="panel lista-proyectos">
      <h2>Proyectos</h2>
      <ul id="proyectos">
         <?php
            $proyectos = listadoProyectos();
            foreach($proyectos as $proyecto){
         ?>
               <li>
                  <a href="index.php?idRespuesta=<?php echo $proyecto['id']; ?>" id="<?php echo $proyecto['id']; ?>">
                     <?php echo $proyecto['nombreProyecto']; ?>
                  </a>
               </li>
         <?php
            }
         ?>
      </ul>
   </div>
</aside>