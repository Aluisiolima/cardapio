import { useState } from 'react';
import { cartao, dinheiro, pix } from '../../asset/pagamentos';
import { ProductStore } from '../../utils/productStore';
import { ProductCarrinho, ProductStoreIds } from '../../types/Product.type';
import { fetchApi } from '../../utils/req';
import { useParams } from 'wouter';
import { ImageError } from '../../utils/ImageError';
import { criarMensagem } from '../../utils/Whatsapp';
import { Empresa } from '../../types/Empresa.type';

type mesa = {
  nome: string;
  numero_mesa: string;
  numero_contato: string;
  mesa: boolean;
  entrega: boolean;
  tipo_pagamento: 'pix' | 'cartao' | 'dinheiro';
  produtos: ProductStoreIds[];
};

export const Mesa: React.FC<{ data: Empresa | null; onTroca: (nome: string) => void }> = ({
  data,
  onTroca,
}) => {
  const [formData, setFormData] = useState<mesa>({
    nome: '',
    numero_mesa: '',
    numero_contato: '',
    mesa: true,
    entrega: false,
    tipo_pagamento: 'pix',
    produtos: ProductStore.getIds(),
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [produtos] = useState<ProductCarrinho[]>(ProductStore.getProdutos());
  const { id } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // remove erro se o usuário preencher
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const enviaPedido = async () => {
    const newErrors: { [key: string]: boolean } = {};
    const camposObrigatorios = ['nome', 'numero_mesa'];

    camposObrigatorios.forEach((campo) => {
      if (!formData[campo as keyof mesa]) {
        newErrors[campo] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      onTroca('Load');
      await fetchApi(formData, 'POST', `/pedido/inserir/${id}`);
    } catch (error) {
      console.error('Error handling detalhes:', error);
    } finally {
      onTroca('Success');
      criarMensagem(formData, produtos, data as Empresa, () => ProductStore.valorTotal());
    }
  };

  const getInputClass = (field: string) => `input_dados ${errors[field] ? 'erro' : ''}`;

  return (
    <div className="container_pagamentos">
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset className="dados">
          <legend>Dados da Mesa</legend>
          <input
            className={getInputClass('nome')}
            type="text"
            placeholder="Nome"
            name="nome"
            required
            value={formData.nome}
            onChange={handleChange}
          />
          <input
            className={getInputClass('numero_mesa')}
            type="number"
            placeholder="Número da Mesa"
            name="numero_mesa"
            required
            value={formData.numero_mesa}
            onChange={handleChange}
          />
          <input
            className={getInputClass('numero_contato')}
            type="number"
            placeholder="Número para Contato"
            name="numero_contato"
            value={formData.numero_contato}
            onChange={handleChange}
          />
        </fieldset>

        <details className="produtos_escolhidos" id="itensEscolhidos">
          <summary>
            Produtos <i className="bi bi-caret-down-fill"></i>
          </summary>
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
            </div>
          ))}
        </details>

        <fieldset className="formas_De_Pagamento">
          <legend>Formas de Pagamento</legend>
          <label className="meios_de_pagamento">
            <img src={pix} alt="Pix" height="50" />
            <input
              type="radio"
              name="tipo_pagamento"
              value="pix"
              checked={formData.tipo_pagamento === 'pix'}
              onChange={handleChange}
            />
            Pix
          </label>
          <label className="meios_de_pagamento">
            <img src={cartao} alt="Cartão" height="50" />
            <input
              type="radio"
              name="tipo_pagamento"
              value="cartao"
              checked={formData.tipo_pagamento === 'cartao'}
              onChange={handleChange}
            />
            Cartão
          </label>
          <label className="meios_de_pagamento">
            <img src={dinheiro} alt="Dinheiro" height="50" />
            <input
              type="radio"
              name="tipo_pagamento"
              value="dinheiro"
              checked={formData.tipo_pagamento === 'dinheiro'}
              onChange={handleChange}
            />
            Dinheiro
          </label>
        </fieldset>

        <div className="finaliza_pedido">
          <p>Valor = R$ {ProductStore.valorTotal().toFixed(2)}</p>
          <button type="button" className="finaly" onClick={enviaPedido}>
            Comprar
          </button>
        </div>
      </form>
    </div>
  );
};
