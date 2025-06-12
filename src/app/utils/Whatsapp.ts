import { Empresa } from '../types/Empresa.type';
import { ProductCarrinho } from '../types/Product.type';

interface DadosCliente {
  nome: string;
  tipo_pagamento: string;
  mesa: boolean;
  entrega: boolean;
  numero_mesa?: string;
  bairro?: string;
  rua?: string;
  numero_casa?: string;
  t_frete?: number;
}

function gerarSaudacao(): string {
  const hora = new Date().getHours();

  if (hora >= 6 && hora < 12) return 'bom dia 😃';
  if (hora >= 12 && hora < 18) return 'boa tarde 👍';
  return 'boa noite 🌙';
}

function formatarProdutos(produtos: ProductCarrinho[]): string {
  return produtos
    .map(
      (p) =>
        `${p.quantidade} ${p.nome_produto} R$${p.valor - p.valor * (p.desconto / 100)} (${p.desconto}% de desconto)`
    )
    .join(', ');
}

function gerarLocalEntrega(dados: DadosCliente): string {
  const { mesa, entrega, numero_mesa, bairro, rua, numero_casa } = dados;

  if (mesa && !entrega) {
    return numero_mesa
      ? `Desejo receber o pedido em minha mesa de número: ${numero_mesa}`
      : 'Informações sobre a mesa estão incompletas.';
  }

  if (!mesa && entrega) {
    return bairro && rua && numero_casa
      ? `Desejo receber o pedido em minha casa de endereço: bairro: ${bairro}, rua: ${rua}, número: ${numero_casa}`
      : 'Informações sobre o endereço estão incompletas.';
  }

  return 'Não foi possível determinar o local de entrega. Verifique as informações.';
}

function montarMensagemWhatsApp(
  dados: DadosCliente,
  produtos: ProductCarrinho[],
  valorTotal: number
): string {
  return `Olá, ${gerarSaudacao()}! Meu nome é ${dados.nome}.
Gostaria de comprar os produtos: ${formatarProdutos(produtos)}.
Valor total: R$-${valorTotal}
Forma de pagamento: ${dados.tipo_pagamento} ${dados.tipo_pagamento === 'dinheiro' ? '💵' : '💳'}.
${gerarLocalEntrega(dados)}
Com frete de R$-${dados.t_frete || 0}. Obrigado!`;
}

export function criarMensagem(
  dados: DadosCliente,
  produtos: ProductCarrinho[],
  empresa: Empresa,
  valorTotalFn: () => number
): void {
  const mensagem = montarMensagemWhatsApp(dados, produtos, valorTotalFn());
  const url = `https://api.whatsapp.com/send/?phone=${empresa.whatsapp}&text=${encodeURIComponent(mensagem)}`;

  setTimeout(() => {
    window.location.href = url;
  }, 1000);
}
