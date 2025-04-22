import { useEffect, useState } from "react";
import { Product } from "../../types/Product.type";
import { Load } from "../Load/Load";
import "./Detalhes.css";
import { ProductStore } from "../../utils/productStore";
import { fetchApi } from "../../utils/req";

type Props = {
    id: number;
    onClose: (close: boolean) => void;
    notFound: (tipo: string, e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export const Detalhes: React.FC<Props> = ({ id, notFound, onClose }) => {
    const [data, setData] = useState<Product | null>(null);
    const [quantidade, setQuantidade] = useState<number>(1);

    useEffect(() => {
            try {
                const produto = async (id: number) => {
                    const result = await fetchApi<Product[]>(null, "GET", `/pegarProduto/unico/${id}`);
                    if (result && result.length > 0) {
                        setData(result[0]);
                    } else {
                        setData(null);
                    }
                }
                produto(id);
            } catch (error) {
                console.error("Error handling detalhes:", error);
                setData(null);
            }
    }, [id]);

    if (!data) return <Load />;

    return (
        <div className="janela_detalhe" id="tela_detalhe">
            <div className="volta">
                <button onClick={() => onClose(true)} ><i className="bi bi-x-lg"></i></button>
            </div>
            <div className="detalhe">
                <div className="inf_produto">
                    <div className="produto_detalhes">
                        <img src={data.path} id={"imgProduct"} alt={data.tipo} style={{width: "200px"}} onError={(e) => notFound(data.tipo, e)} />
                        <div className="quantidade">
                            <button id="menos1" onClick={() => setQuantidade(prev => Math.max(1, prev - 1))}>-</button>
                            <p id="quantidade">{quantidade}</p>
                            <button id="mais1" onClick={() => setQuantidade(prev => prev + 1)}>+</button>
                        </div>
                    </div>

                    <div className="descricao">
                        {data.nome_produto}
                    </div>
                </div>
                <p id="nameProduct"> {data.nome_produto}</p>
                <p className="value"> valor = <span id="value" product-value={data.valor}>{data.valor}</span> </p>
                <p className="value"> desconto atual: <span id="desconto"> {data.desconto} </span>% </p>
                <div className="config">
                    <button id="adicionarCarrinho" onClick={() => ProductStore.addProduto({ ...data, quantidade })}>add carrinho</button>
                </div>
            </div>
        </div>
    );
}
