import { ProductCarrinho, ProductStoreIds } from "../types/Product.type";


export class ProductStore {
    private static produtos: ProductCarrinho[] = [];
    private static ids: ProductStoreIds[] = [];

    /**
     * addProdut
     * @description Adiciona um produto ao carrinho
     * @param {ProductCarrinho} produto - O produto a ser adicionado
     */
    public static addProduto(produto: ProductCarrinho): void {
        const produtoExistente = this.produtos.find(p => p.id_produto === produto.id_produto);
        if (produtoExistente) {
            produtoExistente.quantidade += 1;
        }else {
            this.produtos.push(produto);
        }
        console.log(this.produtos);
    }
}