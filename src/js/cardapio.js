function NotFoundImg(tipo) {
    const tiposImgs = {
        pizza:"./img/default/Pizza_padrao.svg",
        hamburguer:"./img/default/Hambúrguer_padrao.svg",
        bebida:"./img/default/Bebida_padrao.svg",
        default:"./img/default/Pizza_padrao.svg"
    }

    return tiposImgs[tipo] || tiposImgs.default;
}