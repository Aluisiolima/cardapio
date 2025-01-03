async function montarHome() {
    
    render("./components/cardapio.html",null,"container");
    if (sessionStorage.getItem("empresa")) {
        const empresa = JSON.parse(sessionStorage.getItem("empresa")) || [];
        document.title = empresa.nome_empresa;
        render("./components/nav.html", empresa, "container-nav");   
        render("./components/footer.html", empresa, "container-footer");
        pegarProdutosPrincipais(empresa.id_empresa);
    }
}

async function pegarProdutosPrincipais(id) {
    const produtos = await fetchApi(null,"GET",`${link_api}/pegarProdutos/${id}/main`);

    if(!produtos.error){
        produtos.data.forEach(data => {
            render("./components/card_home.html", data, "container-area");
        });
    }
}