<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>cardapio digital</title>

    <!--CSS para footer-->

    <link rel="stylesheet" href="./css/reset.css">
    <link rel="stylesheet" href="./css/telaDeDetalhes.css">
    <link rel="stylesheet" href="./css/home.css">
    <link rel="stylesheet" href="./css/cardapio.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    

</head>
<body>
<div class="container">
    <!--cabecario ,logo e links de acesso rapiodo-->
   <?php include "./components/nav.php"; ?>
   <div id="content-area"></div>
   <?php include "./components/footer.php"; ?>
</div>

</body>
    <script>
        function loadContent(content) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', './config/loadContent.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    document.getElementById('content-area').innerHTML = xhr.responseText;
                } else {
                    document.getElementById('content-area').innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
                }
            };

            xhr.onerror = function () {
                document.getElementById('content-area').innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
            };

            xhr.send('content=' + encodeURIComponent(content));
        }
        loadContent('home');
    </script>
<script src="./js/cabercario.js" defer></script>
<script src="./js/carinho.js" defer></script>
<script src='./js/bancoDeDados.js' defer></script>
<script src='./js/cardapio.js' defer></script>
<script src='./js/main.js' defer></script>
</html>