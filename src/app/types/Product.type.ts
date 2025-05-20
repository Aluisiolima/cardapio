export type Product = {
  id_produto: number;
  nome_produto: string;
  valor: number;
  tipo: string;
  path: string;
  desconto: number;
  descricao: string | null;
};

export type ProductStoreIds = {
  id: number;
  quantidade: number;
};

export type ProductCarrinho = Product & {
  quantidade: number;
};
