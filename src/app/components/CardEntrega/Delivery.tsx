import React, { useState, useEffect } from "react";
import { cartao, dinheiro, pix } from "../../asset/pagamentos";
import { ProductStore } from "../../utils/productStore";
import { ProductCarrinho, ProductStoreIds } from "../../types/Product.type";
import { fetchApi } from "../../utils/req";
import { useParams } from "wouter";
import { ImageError } from "../../utils/ImageError";
import { calcFrete } from "../../utils/calcFrete";

type Entrega = {
  nome: string;
  bairro: string;
  rua: string;
  numero_casa: string;
  numero_contato: string;
  entrega: boolean;
  tipo_pagamento: "pix" | "cartao" | "dinheiro";
  produtos: ProductStoreIds[];
};
export const Delivery: React.FC = () => {
  const [formData, setFormData] = useState<Entrega>({
    nome: "",
    bairro: "",
    rua: "",
    numero_casa: "",
    numero_contato: "",
    entrega: true,
    tipo_pagamento: "pix",
    produtos: ProductStore.getIds(),
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [produtos, ] = useState<ProductCarrinho[]>(ProductStore.getProdutos());
  const { id } = useParams<{ id:number }>();
  const [frete, setFrete] = useState<string | null | void>(null);

  useEffect(() => {
    const fetchFrete = async () => {
      const calculatedFrete = await calcFrete(id);
      setFrete(calculatedFrete);
    };
    fetchFrete();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // remove erro se o usuário preencher
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const enviaPedido = async () => {
    const newErrors: { [key: string]: boolean } = {};
    const camposObrigatorios = ["nome", "bairro", "rua", "numero_casa"];

    camposObrigatorios.forEach((campo) => {
      if (!formData[campo as keyof Entrega]) {
        newErrors[campo] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await fetchApi(formData, "POST", `/inserirPedido/${id}`);

    } catch (error) {
      console.error("Error handling detalhes:", error);
    } finally {

    }
  };

  const getInputClass = (field: string) => `input_dados ${errors[field] ? "erro" : ""}`;

  return (
    <div className="container_pagamentos">
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset className="dados">
          <legend>dados para entrega</legend>
          <input
            className={getInputClass("nome")}
            type="text"
            placeholder="nome"
            name="nome"
            required
            value={formData.nome}
            onChange={handleChange}
          />
          <input
            className={getInputClass("bairro")}
            type="text"
            placeholder="bairro"
            name="bairro"
            required
            value={formData.bairro}
            onChange={handleChange}
          />
          <input
            className={getInputClass("rua")}
            type="text"
            placeholder="rua"
            name="rua"
            required
            value={formData.rua}
            onChange={handleChange}
          />
          <input
            className={getInputClass("numero_casa")}
            type="number"
            placeholder="numero da casa"
            name="numero_casa"
            required
            value={formData.numero_casa}
            onChange={handleChange}
          />
          <input
            className={getInputClass("numero_contato")}
            type="number"
            placeholder="numero para contato"
            name="numero_contato"
            value={formData.numero_contato}
            onChange={handleChange}
          />
        </fieldset>

        <details className="produtos_escolhidos" id="itensEscolhidos">
          <summary>
            produtos <i className="bi bi-caret-down-fill"></i>
          </summary>
          {produtos.map((produto) => (
            <div className="card_produto" key={produto.id_produto}>
              <div className="card_img">
                <img src={produto.path} alt={produto.nome_produto} onError={(e) => ImageError(produto.tipo, e)} />
              </div>
              <div className="card_nome">{produto.nome_produto}</div>
              <div className="card_quantidade">{produto.quantidade}</div>
              <div className="card_valor">R$ {produto.valor}</div>
            </div>
          ))}
        </details>

        <fieldset className="formas_De_Pagamento">
          <legend>formas de pagamento</legend>
          <label className="meios_de_pagamento">
            <img src={pix} alt="pix" height="50" />
            <input
              type="radio"
              name="tipo_pagamento"
              value="pix"
              checked={formData.tipo_pagamento === "pix"}
              onChange={handleChange}
              required
            />
          </label>
          <label className="meios_de_pagamento">
            <img src={cartao} alt="cartao" height="50" />
            <input
              type="radio"
              name="tipo_pagamento"
              value="cartao"
              checked={formData.tipo_pagamento === "cartao"}
              onChange={handleChange}
              required
            />
          </label>
          <label className="meios_de_pagamento">
            <img src={dinheiro} alt="dinheiro" height="50" />
            <input
              type="radio"
              name="tipo_pagamento"
              value="dinheiro"
              onChange={handleChange}
              required
            />
          </label>
        </fieldset>

        <div className="finaliza_pedido">
          <p id="frete">
          frete = {frete !== null ? `R$ ${(+frete).toFixed(2)}` : "Calculando..."}
          </p>
          <p>
            valor = <span id="valor">{(ProductStore.valorTotal()).toFixed(2)}</span>
          </p>
          <button
            type="button"
            className="finaly"
            onClick={enviaPedido}
          >
            comprar
          </button>
        </div>
      </form>
    </div>
  );
};
