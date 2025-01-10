function educacao() {
    const now = new Date();
    const hora = now.getHours();

    if (hora >= 6 && hora < 12) {
        return "bom dia 😃";
    } else if (hora >= 12 && hora < 18) {
        return "boa tarde 👍";
    } else if (hora >= 18 || hora < 6) {
        return "boa noite 🌙";
    }
}

function listProduto(produtos) {
    let frase = '';
    produtos.forEach(p => {
        frase += `${p.quantidade} ${p.nome} ${p.valor}, `;
    });
    return frase;
}
function localDePedido(mesa, entrega, Nmesa, bairro, rua, Ncasa) {
    if (mesa && !entrega) {
        if (Nmesa) {
            return `Desejo receber o pedido em minha mesa de número: ${Nmesa}`;
        } else {
            return 'Informações sobre a mesa estão incompletas.';
        }
    }

    if (!mesa && entrega) {
        if (bairro && rua && Ncasa) {
            return `Desejo receber o pedido em minha casa de endereço: bairro: ${bairro}, rua: ${rua}, número da casa: ${Ncasa}`;
        } else {
            return 'Informações sobre o endereço estão incompletas.';
        }
    }

    return 'Não foi possível determinar o local de entrega. Verifique as informações.';
}

function criar_mensagem(dados) {
    const mensagem = 
`ola ${educacao()}! meu nome é ${dados.nome} 
e gostaria de comprar os produtos: ${listProduto(produtos_escolhidos)} no valor total de: R$-${valorTotal()} 
irei pagar em: ${dados.tipo_pagamento} 💳 
${localDePedido(dados["mesa"], dados["entrega"], dados["numero_mesa"], dados["bairro"], dados["rua"], dados["numero_casa"])}`;

    const whatsapp = `https://api.whatsapp.com/send/?phone=${empresa[0].whatsapp}&text=${encodeURIComponent(mensagem)}`;
    setTimeout(() => {
        window.location.href = whatsapp;
    }, 1000);
}
