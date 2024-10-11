

<footer class="bg-dark text-light open-sans">
    <div class="py-3">
        
        <!--Esquerda--> 
        <div class="col-6">
          <p>
            Direto do forno para aquecer o coração...
          </p>
        </div>
      
        <!--Direita-->
        <div class="col-6 direitaF">
          <ul>
            <li>
              <a href="https://wa.me/<?php echo $dados_empressa['whatsapp'] ?>" class="a">
                <span>
                <i class="bi bi-whatsapp text-success"></i>
                Whatsapp</span>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/<?php echo $dados_empressa['instagram'] ?>/" class="a">
                <span>
                <i class="bi bi-instagram text-danger"></i>
                Instagram</span>
              </a>
            </li>
            <li class="margin-bottom">
              <span>
                <i class="bi bi-envelope"></i>
                Email: <?php echo $dados_empressa['email'] ?>
              </span>
              
            </li>
            <li class="margin-bottom">
              <a href="#" class="a" >
                <span>
                  <i class="bi bi-map"></i>
                  <?php echo $dados_empressa['endereco'] ?></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
  
  <div class="assinatura">
  Desenvolvido por os alunos do <a href="#" class="a">CETI Acrísio Veras</a> 
  </div>
  
</footer> 