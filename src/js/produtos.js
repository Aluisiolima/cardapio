const produtos_escolhidos = [];
let local = true;
const keyProducts = [];

function enviarDadosProdutos() {

    const jsonIDs = JSON.stringify(keyProducts);
    const jsonProduct = JSON.stringify(retirarImgsListaProdutos());
    document.getElementById("ids").value = jsonIDs;
    document.getElementById("product").value = jsonProduct;

    return true;
}

async function carregaCardsProdutos(id) {
    document.getElementById("container_load").style.display = "flex";
    const produtos = await fetchApi(null, "GET", `${link_api}/pegarProdutos/${id}`);
    if (!produtos.error && produtos.data.length !== 0) {
        let tipoAtual = "";
        const container = document.getElementById("produtos");
        produtos.data.forEach(data => {
            if (tipoAtual !== data.tipo) {
                tipoAtual = data.tipo;
                container.innerHTML += `<div class="title_tipo" id="${tipoAtual}"><h3>${tipoAtual}:</h3></div>`
            }
            // render("./components/card_produto.html",data,"produtos");
            container.innerHTML += `<div class="card" >
                                        <div class="desconto">${(data.desconto === 0) ? "" : data.desconto + "%"}</div>
                                        <img src="${data.path}" alt="${data.tipo}" onerror="NotFoundImg('${data.tipo}', this)">
                                        <p class="detalhes">${data.nome_produto}</p>
                                        <p class="detalhes">R$ ${(data.valor * (1 - data.desconto / 100)).toFixed(2)}</p>
                                        <button onclick="getDetalhes('${data.id_produto}')" class="buttoncompra">compra</button>
                                    </div>`

        });
    }
    document.getElementById("container_load").style.display = "none";
}

async function getDetalhes(id) {
    document.getElementById("container_load").style.display = "flex";
    const produto = await fetchApi(null, "GET", `${link_api}/pegarProduto/unico/${id}`);
    document.getElementById("container_detalhes").style.display = "flex"
    if (!produto.error && produto.data.length !== 0) {
        produto.data.forEach(data => {
            data["mensagem"] = mensagens();
            render("./components/card_detalhes.html", data, "container_detalhes");
        })
    }
    document.getElementById("container_load").style.display = "none";
}


function mensagens() {
    const mensagensPropaganda = [
        "😋 O sabor que você adora está aqui, esperando por você! Experimente agora! 🍴",
        "✨ Um toque de magia em cada pedido. Faça parte dessa experiência única! 🌟",
        "🔥 Chegou o momento de se deliciar com algo especial. Não perca! 🚀",
        "🎉 Surpreenda-se com algo incrível! Peça agora e aproveite! 🛒",
        "🌟 Porque você merece o melhor, nós entregamos com qualidade e rapidez! 🚚",
        "💥 Promoção imperdível hoje! Faça seu pedido e aproveite essa oferta especial! 🤑",
        "🥳 Tudo o que você precisa para transformar o dia em uma festa está aqui! 🎊",
        "🧡 Cada detalhe feito para trazer sabor e alegria para você e sua família! 😍",
        "⏳ Não perca tempo! A felicidade está a apenas um clique de distância! 📲",
        "💡 Descubra o que temos de mais especial para você. Seu próximo pedido está te esperando! 🤩",
        "📞 É fácil, rápido e delicioso! Peça agora e aproveite o melhor de nós! ✅",
        "🍀 Um toque de sabor para iluminar seu dia. Experimente e se encante! 🌈",
        "🌎 Estamos aqui para trazer mais alegria ao seu momento. Entre em contato agora! 🤗",
        "🎁 Surpreenda-se com algo novo e delicioso. O que está esperando? Peça já! 📦",
        "❤️ Porque sua satisfação é nossa prioridade. Estamos prontos para atender você! 🌟"
    ];
    const indexMensagem = Math.floor(Math.random() * mensagensPropaganda.length);

    return mensagensPropaganda[indexMensagem];
}
