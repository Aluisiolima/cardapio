<?php 
    include '../config.php';
    include  ROOT.'/Database/database.php';
    require_once "./config/verificacaoUser.php";
    include "./config/loadContent.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>admin</title>
</head>
<div id="view"></div>
<body>
    
</body>
<script>
        
    function loadContent(content) {
        const content_resposta = document.getElementById('view');


        const xhr = new XMLHttpRequest();
        xhr.open('POST', './config/loadContent.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                content_resposta.innerHTML = xhr.responseText;
                
            } else {
                content_resposta.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
                
            }
        };

        xhr.onerror = function () {
            content_resposta.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
            
        };

        xhr.send('content=' + encodeURIComponent(content));
    }
    loadContent('nav')
</script>
</html>