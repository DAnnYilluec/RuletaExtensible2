<?php
$server = 'irc.chat.twitch.tv';
$port = 6667;
$nickname = 'dannyilluec';
$token = 'oauth:your_oauth_token';  // formateado como 'oauth:your_oauth_token'
$channel = 'angie404_';

$socket = fsockopen($server, $port);
if (!$socket) {
    die("No se puede conectar a Twitch IRC server");
}

// Enviar el mensaje NICK
fwrite($socket, "NICK $nickname\r\n");

// Enviar el mensaje PASS
fwrite($socket, "PASS $token\r\n");

// Unirse al canal
fwrite($socket, "JOIN #$channel\r\n");

// Escuchar el mensaje de bienvenida del servidor y la confirmación de unión
while (!feof($socket)) {
    $response = fgets($socket);

    // Ping-Pong para mantener la conexión viva
    if (strpos($response, 'PING') === 0) {
        fwrite($socket, 'PONG ' . substr($response, 5) . "\r\n");
    }

    // Verificar la confirmación de unión al canal
    if (strpos($response, "353 $nickname = #$channel") !== false) {
        // Extraer la lista de usuarios del mensaje 353
        preg_match('/:.* 353 .* = #.* :(.+)/', $response, $matches);
        if (isset($matches[1])) {
            $users = explode(' ', $matches[1]);
            echo "Usuarios en el chat:\n";
            foreach ($users as $user) {
                echo "$user\n";
            }
            break;
        }
    }
}

// Cerrar la conexión
fclose($socket);
?>

