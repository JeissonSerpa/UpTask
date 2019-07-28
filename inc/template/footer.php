<script src="js/sweetalert2.all.min.js"></script>

<?php
   $actual = nombrePagina();
   if($actual == 'login' || $actual == 'crear-cuenta'){
      echo "<script src='js/index.js'></script>";
   }else{
      echo "<script src='js/scripts.js'></script>";
   }
?>
</body>
</html>