import { useState } from 'react';
import { ProductStore } from '../../utils/productStore';
import './Carinho.css';
import { ProductCarrinho } from '../../types/Product.type';
import { ImageError } from '../../utils/ImageError';

export const Carinho: React.FC<{ onTroca: (nome: string) => void }> = ({ onTroca }) => {
  const [entrega, setEntrega] = useState<boolean>(true);
  const [produtos, setProdutos] = useState<ProductCarrinho[]>(ProductStore.getProdutos());

  const finaliza = () => {
    if (produtos.length === 0) {
      alert('Adicione produtos ao carinho');
      return;
    }
    if (entrega) {
      onTroca('Delivery');
      return;
    }
    onTroca('Mesa');
  };

  return (
    <>
      <header className="title">carinho</header>
      <div className="container_list_produtos" data-testid="carinho">
        <div className="card_produtos_carinho" id="produtos_carinho">
          {produtos.map((produto) => (
            <div className="card_produto" key={produto.id_produto}>
              <div className="card_img">
                <img
                  src={produto.path}
                  alt={produto.nome_produto}
                  onError={(e) => ImageError(produto.tipo, e)}
                />
              </div>
              <div className="card_nome">{produto.nome_produto}</div>
              <div className="card_quantidade">{produto.quantidade}</div>
              <div className="card_valor">R$ {produto.valor}</div>
              <div
                className="remove"
                onClick={() => {
                  ProductStore.removeProduto(produto.id_produto);
                  setProdutos(ProductStore.getProdutos());
                }}
              >
                <i className="bi bi-x-lg"></i>
              </div>
            </div>
          ))}
        </div>

        <div className="valor_total">
          <p>
            valor total = R$<span id="valortotal">{ProductStore.valorTotal().toFixed(2)}</span>{' '}
          </p>
        </div>
        <button
          id="entrega"
          onClick={() => setEntrega(true)}
          style={{ background: entrega === true ? 'green' : 'antiquewhite' }}
        >
          entrega
        </button>
        <button
          id="mesa"
          onClick={() => setEntrega(false)}
          style={{ background: entrega === true ? 'antiquewhite' : 'green' }}
        >
          mesa
        </button>

        <div className="config">
          <button
            onClick={() => {
              onTroca('Cardapio');
            }}
          >
            Mais Produtos
          </button>
          <button
            onClick={() => {
              finaliza();
            }}
          >
            Compra
          </button>
        </div>
      </div>
    </>
  );
};
