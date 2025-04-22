import { useState } from "react";
import { Load } from "../Load/Load";
import "./Menu.css";
import { Product } from "../../types/Product.type";
import { bebida, adicionais, artesanais, batatinha, hamburguer, pizza, sucos } from "../../asset/defualt";
import { Detalhes } from "../Detalhes/Detalhes";

export const Menu: React.FC<{ data: Product[] | null }> = ({ data }) => {
    const [idDetalhes, setDetalhes] = useState<number>(0);
    const [onCloseDatalhes, onClose] = useState<boolean>(true);

    const getPrecoComDesconto = (valor: number, desconto: number): string => {
        return (valor * (1 - desconto / 100)).toFixed(2);
    };

    const handleImageError = (tipo: string, e: React.SyntheticEvent<HTMLImageElement>) => {
        const tiposImgs: Record<string, string> = {
            pizza: pizza,
            hamburguer: hamburguer,
            hambuguer: hamburguer,
            bebida: bebida,
            bebidas: bebida,
            adicionais: adicionais,
            artesanal: artesanais,
            porção: batatinha,
            sucos: sucos,
            default: pizza,
        }
        const tipoSemEspaco = tipo.replace(/\s+/g, "");

        (e.target as HTMLImageElement).src = tiposImgs[tipoSemEspaco] || tiposImgs.default;
    };

    const handleDetalhes = (id: number) => {
        setDetalhes(id);
        onClose(false);
    };

    const grouped = data?.reduce((acc, item) => {
        if (!acc[item.tipo]) acc[item.tipo] = [];
        acc[item.tipo].push(item);
        return acc;
    }, {} as Record<string, Product[]>);

    return (

        <div className="container_cardapio" id="cardapio_page">

            {!data ? (
                <Load />
            ) : (
                Object.entries(grouped!).map(([tipo, produtos]) => (
                    <div key={tipo}>
                        <div className="title_tipo" id={tipo}>
                            <h3>{tipo}:</h3>
                        </div>
                        <div className="cardapio_produtos_lanche" id="produtos">
                            {produtos.map((produto) => (
                                <div className="card" key={produto.id_produto}>
                                    <div className="desconto">
                                        {produto.desconto === 0 ? "" : `${produto.desconto}%`}
                                    </div>
                                    <img
                                        src={produto.path}
                                        alt={produto.tipo}
                                        onError={(e) => handleImageError(produto.tipo, e)}
                                    />
                                    <p className="detalhes">{produto.nome_produto}</p>
                                    <p className="detalhes">
                                        R$ {getPrecoComDesconto(+produto.valor, produto.desconto)}
                                    </p>
                                    <button
                                        onClick={() => {handleDetalhes(produto.id_produto); onClose(false)}}
                                        className="buttoncompra"
                                    >
                                        compra
                                    </button>
                                </div>
                            ))}

                        </div>
                    </div>
                ))
            )}
            <div>
                <p id="Ncompras" className="numerador"></p>
                <button id="button_carinho">
                    <i className="bi bi-cart4"></i>
                </button>
            </div>

            {!onCloseDatalhes ? (<div id="container_detalhes" className="container_detalhais">
                <Detalhes id={idDetalhes} notFound={handleImageError} onClose={onClose}/>
            </div>
            ) : (<></>)}
        </div>

    );
};
