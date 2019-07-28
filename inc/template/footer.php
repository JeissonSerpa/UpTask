<script src="js/sweetalert2.all.min.js"></script>

<?php
   $actual = nombrePagina();
   if($actual = 'login' || $actual = 'crear-cuenta'){
      echo "<script src='js/index.js'></script>";
   }
?>
</body>
</html>