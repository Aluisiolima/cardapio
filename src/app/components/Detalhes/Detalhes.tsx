import { useEffect, useState } from 'react';
import { Product } from '../../types/Product.type';
import { Load } from '../Load/Load';
import './Detalhes.css';
import { ProductStore } from '../../utils/productStore';
import { fetchApi } from '../../utils/req';
import { ImageError } from '../../utils/ImageError';

type Props = {
  id: number;
  onClose: (close: boolean) => void;
};

export const Detalhes: React.FC<Props> = ({ id, onClose }) => {
  const [data, setData] = useState<Product | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);

  useEffect(() => {
    try {
      const produto = async (id: number) => {
        const result = await fetchApi<Product>(null, 'GET', `/pegarProduto/unico/${id}`);
        setData(result);
      };
      produto(id);
    } catch (error) {
      console.error('Error handling detalhes:', error);
      setData(null);
    }
  }, [id]);

  const setAnimacao = () => {
    const tela = document.getElementById('tela_detalhe');
    if (tela) {
      tela.classList.add('animate');
      setTimeout(() => {
        tela.classList.remove('animate');
      }, 500);
    }
  };

  if (!data) return <Load />;

  return (
    <div className="janela_detalhe" id="tela_detalhe">
      <div className="volta">
        <button onClick={() => onClose(true)} data-testid="close-button">
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="detalhe">
        <div className="inf_produto">
          <div className="produto_detalhes">
            <img
              src={data.path}
              id={'imgProduct'}
              alt={data.tipo}
              style={{ width: '200px' }}
              onError={(e) => ImageError(data.tipo, e)}
            />
            <div className="quantidade">
              <button id="menos1" onClick={() => setQuantidade((prev) => Math.max(1, prev - 1))}>
                -
              </button>
              <p id="quantidade">{quantidade}</p>
              <button id="mais1" onClick={() => setQuantidade((prev) => prev + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="descricao">{data.nome_produto}</div>
        </div>
        <p id="nameProduct"> {data.nome_produto}</p>
        <p className="value">
          {' '}
          valor = {(data.valor * (1 - data.desconto / 100) * quantidade).toFixed(2)}
        </p>
        <div className="config">
          <button
            id="adicionarCarrinho"
            onClick={() => {
              ProductStore.addProduto({ ...data, quantidade });
              setAnimacao();
              setTimeout(() => {
                onClose(true);
              }, 500);
            }}
          >
            add carrinho
          </button>
        </div>
      </div>
    </div>
  );
};
