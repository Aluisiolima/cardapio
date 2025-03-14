async function montarHome() {
  let networksFooter = "";
  let networksNav = "";

  await render("./components/cardapio.html", null, "container");

  if (empresa[0].instagram) {
    networksFooter += `
            <li>
              <a href="https://www.instagram.com/${empresa[0].instagram}/" class="a">
                <span>
                <i class="bi bi-instagram text-danger"></i>
                Instagram</span>
              </a>
            </li>
        `;
    networksNav += `
            <li>
                <a href="https://www.instagram.com/${empresa[0].instagram}/">
                    <i class="bi bi-instagram" style="font-size: 1.5em;margin-left: .5em;"></i>
                </a>
            </li>
        `;
  }
  if (empresa[0].email) {
    networksFooter += `
             <li class="margin-bottom">
              <span>
                <i class="bi bi-envelope"></i>
                Email: ${empresa[0].email}
              </span>
              
            </li>
        `;
  }
  if (empresa[0].facebook) {
    networksFooter += `
             <li class="margin-bottom">
              <span>
                <i class="bi bi-envelope"></i>
                Email: ${empresa[0].email}
              </span>
              
            </li>
        `;
    networksNav += `
            <li>
                <a href="https://www.facebook.com/${empresa[0].facebook}">
                    <i class="bi bi-facebook" style="font-size: 1.5em;margin-left: .5em;"></i>
                </a>
            </li>
        `;
  }

  empresa[0].networksNav = networksNav;
  empresa[0].networksFooter = networksFooter;

  document.title = empresa[0].nome_empresa;
  await render("./components/nav.html", empresa[0], "container-nav");

  await render("./components/footer.html", empresa[0], "container-footer");

  await pegarProdutosPrincipais(empresa[0].id_empresa);
}

async function pegarProdutosPrincipais(id) {
  const produtos = await fetchApi(
    null,
    "GET",
    `${link_api}/pegarProdutos/${id}/main`
  );

  if (!produtos.error) {
    produtosMain.push(produtos.data);
    produtos.data.forEach((data) => {
      render("./components/card_home.html", data, "container-area");
    });
  }
}

async function filterTipo(tipo, id) {
  await cardapioAtive(id);
  window.location.href = `#${tipo}`;
  updateCarrinho();
}
