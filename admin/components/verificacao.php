<div class="login">
    <form action="./config/verificacaoUser.php" method="POST">
        <label for="codigo">codigo:</label>
        <input type="number" name="codigo" required>
        <br>
        <label for="senha">senha:</label>
        <input type="password" name="senha" required>
        <br>
        <label for="empressa">empressa:</label>
        <select name="empressa" required>
            <?php
            // Preenche o menu de seleção com opções do banco de dados
            foreach ($list_empresas as $empresa) {
                echo "<option value='{$empresa['id_empressa']}' >{$empresa['nome_empressa']} </option>";
            }
            ?>
        </select>

        <button type="submit">enviar</button>
    </form>
</div>