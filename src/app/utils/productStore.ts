import { ProductCarrinho, ProductStoreIds } from '../types/Product.type';

export class ProductStore {
  private static produtos: ProductCarrinho[] = [];
  private static ids: ProductStoreIds[] = [];

  /**
   * addProdut
   * @description Adiciona um produto ao carrinho
   * @param {ProductCarrinho} produto - O produto a ser adicionado
   */
  public static addProduto(produto: ProductCarrinho): void {
    const produtoExistente = this.produtos.find((p) => p.id_produto === produto.id_produto);
    const produtoIdExistente = this.ids.find((p) => p.id === produto.id_produto);
    if (produtoExistente) {
      produtoExistente.quantidade += produto.quantidade;
    } else {
      this.produtos.push(produto);
    }
    if (produtoIdExistente) {
      produtoIdExistente.quantidade += produto.quantidade;
    } else {
      this.ids.push({
        id: produto.id_produto,
        quantidade: produto.quantidade,
      });
    }
  }

  public static removeProduto(id_produto: number): void {
    this.produtos = this.produtos.filter((produto) => produto.id_produto !== id_produto);
    this.ids = this.ids.filter((produto) => produto.id !== id_produto);
  }

  public static valorTotal(): number {
    return this.produtos.reduce((total, produto) => {
      const valorComDesconto = produto.valor - produto.valor * (produto.desconto / 100);
      return total + valorComDesconto * produto.quantidade;
    }, 0);
  }

  public static getProdutos(): ProductCarrinho[] {
    return this.produtos;
  }

  public static getIds(): ProductStoreIds[] {
    return this.ids;
  }
}
