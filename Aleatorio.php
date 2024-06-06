<!DOCTYPE html>
<html lang="">
<head>
    <title>Ruleta</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link href="styleAl.css" rel="stylesheet" type="text/css" media="all">
    <link href="estilos.css" rel="stylesheet" type="text/css" media="all">
    <link rel="icon" href="angie.png">
    <script src="https://kit.fontawesome.com/801222a0d1.js" crossorigin="anonymous"></script>
</head>
<body id="top">
<!-- MENU -->
<header id="header" class="hoc clear">
    <div id="logo" class="fl_left" style="margin-right: 60px;">
        <h1><a href="index.php">RULETA DE ANGIE404_</a></h1>
    </div>
    <nav id="mainav" class="fl_right">
        <ul class="clear">
            <li><a href="RuletaInfantil/index.html">Ruleta infantil</a></li>
            <li class="active"><a href="Aleatorio.php">Ruleta Aleatoria</a></li>
            <li><a href="Subs.php">Ruleta Clasista</a></li>
            <li><a href="Seguidores.php">Ver Seguidores</a></li>
        </ul>
    </nav>
</header>
<input type="button" value="DALE A LA RULETA, FURCIA" style="float:left; margin-top: 100px" id='spin' />
<canvas id="canvas" width="500" height="500"></canvas>
<div class="tarjetilla">
<h2 class="fl_left" style="margin-right: 60px;">MODIFICAR ATRIBUTOS</h2>
<label for="tiempoGiro">Tiempo de giro (segundos):</label>
<input type="number" id="tiempoGiro" value="15" style="color: black">
<button id="cambiar">Cambiar</button>
</div>
<script src="scriptA.js"></script>
</body>
</html>
