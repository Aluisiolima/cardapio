function NotFoundImg(tipo, img) {
    const tiposImgs = {
        pizza:"./img/default/Pizza_padrao.svg",
        hamburguer:"./img/default/Hambúrguer_padrao.svg",
        bebida:"./img/default/Bebida_padrao.svg",
        default:"./img/default/Pizza_padrao.svg"
    }

    img.src = tiposImgs[tipo] || tiposImgs.default;
}

function fechaDetalhes(){
    document.getElementById("container_detalhes").style.display = "none";
    document.getElementById("container_detalhes").innerHTML = "";
}