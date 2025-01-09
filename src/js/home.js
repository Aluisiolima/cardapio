async function montarHome() {
    render("./components/cardapio.html",null,"container");
    
    document.title = empresa[0].nome_empresa;
    render("./components/nav.html", empresa[0], "container-nav");   
    render("./components/footer.html", empresa[0], "container-footer");
    pegarProdutosPrincipais(empresa[0].id_empresa);
}

async function pegarProdutosPrincipais(id) {
    const produtos = await fetchApi(null,"GET",`${link_api}/pegarProdutos/${id}/main`);

    if(!produtos.error){
        produtosMain.push(produtos.data);
        produtos.data.forEach(data => {
            render("./components/card_home.html", data, "container-area");
        });
    }
}

async function filterTipo(tipo, id) {
    await cardapioAtive(id);
    window.location.href = `#${tipo}`; 
}