var options = ["Queso", "Jamón", "Papas", "Gaseosa", "-10%", "Huevo", "Tocino", "Imán", "-20%", "Papas", "Gaseosa", "Queso", "Nada", "Hotdog", "Pierdes", "Carne x2", "Taco", "Sanduche"];

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
    var blueColors = [
        '#87CEFA', // Azul Cielo Claro
        '#6495ED', // Azul Aciano
        '#4682B4', // Azul Acero
        '#5F9EA0', // Azul Cadete
        '#7B68EE', // Azul Medio Pizarra
        '#00008B', // Azul Oscuro
        '#4169E1', // Azul Real
        '#000080', // Azul Marino
        '#191970', // Azul Medianoche
        '#4B0082'  // Azul Índigo
    ];

    // Devuelve un color azul de la lista basado en el índice del elemento
    return blueColors[item % blueColors.length];
}

function drawRouletteWheel() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var outsideRadius = 200;
        var textRadius = 160;
        var insideRadius = 125;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,500,500);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.font = 'bold 12px Helvetica, Arial';

        for(var i = 0; i < options.length; i++) {
            var angle = startAngle + i * arc;
            ctx.fillStyle = getColor(i, options.length);

            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();

            ctx.save();
            ctx.shadowOffsetX = -1;
            ctx.shadowOffsetY = -1;
            ctx.shadowBlur    = 0;
            ctx.shadowColor   = "rgb(220,220,220)";
        }

        //Arrow
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.fill();
    }
}
document.getElementById("cambiar").addEventListener("click", function() {
    var tiempoIngresado = document.getElementById("tiempoGiro").value;
    spinTimeTotal = (tiempoIngresado || 15) * 1000; // Usa el valor ingresado o 15 segundos por defecto
});
function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    rotateWheel();
}

function rotateWheel() {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var randomOptionIndex = Math.floor(Math.random() * options.length); // Selecciona una opción al azar
    ctx.save();
    ctx.font = 'bold 30px Helvetica, Arial';
    var text = options[randomOptionIndex]; // Usa la opción seleccionada al azar
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
}

function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();