<?php 
    include 'inc/funciones/sesion.php';
    include 'inc/template/barra.php';
    include 'inc/funciones/funciones.php';
    include 'inc/template/head.php';
    if(isset($_GET['idRespuesta'])){
        $idProyecto = $_GET['idRespuesta'];
    }else{
        $idProyecto = "";
    }
?>

<div class="contenedor">
    <?php
        include 'inc/template/sidebar.php'; 
        $proyecto = obtenerProyecto($idProyecto);
        if($proyecto){
    ?>
    <main class="contenido-principal">
        <h1>
            <?php
                foreach($proyecto as $proyecto){
                    echo "Proyecto: <span>".$proyecto['nombreProyecto']."</span>";
                }
            ?>
        </h1>

        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
            </div>
            <div class="campo enviar">
                <input type="hidden" id="idProyecto" value="<?php echo $idProyecto; ?>" value="id_proyecto">
                <input type="submit" class="boton nueva-tarea" value="Agregar">
            </div>
        </form>
        


        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul id="tareas">
                <li id="tarea:" class="tarea">
                <p>Cambiar el Logotipo</p>
                    <div class="acciones">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-trash"></i>
                    </div>
                </li>  
            </ul>
        </div>
    </main>
    <?php 
        }else{
            echo "
                <main class='contenido-principal'>
                    <h1>Selecciona un Proyecto o Crealo a la Izquierda</h1>
                </main>
            ";
        } 
    ?>
</div><!--.contenedor-->

<?php 
    include 'inc/template/footer.php'; 
?>