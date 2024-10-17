
<div class="init-container">
    <div class="img_logo">
        <img src="../../<?php echo($_SESSION['date_user']['logo_img'])?>" alt="">
    </div>
    <ul class="infs">
        <li><?php echo($_SESSION['date_user']['nome_empressa'])?></li>
        <li><?php echo($_SESSION['date_user']['nome'])?></</li>
        <li><?php echo($_SESSION['date_user']['cargo'])?></li>
    </ul>
    <form action="../config/sair.php" method="post" class="sair">
        <button type="submit" class="btn-sair">sair</button>
    </form>
</div>