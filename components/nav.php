

<nav class="cabecario">
        <div class="logo">
          <img src="./img/foto-perfilempresa.svg" alt="logo" height="30" >  
        <h1> <?php echo $dados_cardapio['nome_empressa'] ?> </h1>
        </div>

    <div class="operacional">
        <div class="link-navegacao" id="navegacao">
            <div class="links">
                <p  id="home" onclick="homeAtive()">home</p>
            </div>
            <div class="links" >
                <p id="cardapio" onclick="cardapioAtive()">cardapio</p>
            </div>
        </div>

        <div class="contatos">
            <ul>
                <li>
                    <a href="https://wa.me/<?php echo $dados_cardapio['whatsapp'] ?>">
                        <i class="bi bi-whatsapp" style="font-size: 1.5em;"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/<?php echo $dados_cardapio['instagram'] ?>/">
                        <i class="bi bi-instagram" style="font-size: 1.5em;margin-left: .5em;"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/<?php echo $dados_cardapio['facebook'] ?>">
                        <i class="bi bi-facebook" style="font-size: 1.5em;margin-left: .5em;"></i>
                    </a>
                </li>
            </ul>
        
            
        </div>
    </div>
</nav> 