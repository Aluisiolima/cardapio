export type Product = {
  id_produto: number;
  nome_produto: string;
  valor: number;
  tipo: string;
  path: string;
  desconto: number;
};

export type ProductStoreIds = {
  id: number;
  quantidade: number;
  desconto_aplicado: number;
};

export type ProductCarrinho = Product & {
  quantidade: number;
};
