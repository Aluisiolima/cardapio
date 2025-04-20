import { JSX, useEffect, useState } from "react";
import "./Destaques.css";
import { useParams } from "wouter";
import { fetchApi } from "../../utils/req";
import { Load } from "../Load/Load";

type Destaques = {
    tipo: string;
}

export const Destaque: React.FC = (): JSX.Element => {
    const { id } = useParams();
    const [data, setData] = useState<Destaques[] | null>(null);

    useEffect(() => {
        const getProdutos = async () => {
            try {
                const result = await fetchApi<Destaques[]>(null, "GET", `/pegarProdutos/${id}/main`);
                setData(result);
            } catch (error) {
                console.error(error);
            }
        }

        getProdutos();
    }, [id]);

    return (
        <>
            {data?.map((item) => (
                <div className={`produtos  ${item.tipo}`} key={item.tipo}>
                    {item.tipo}
                </div>
            )) || <Load />}
        </>
    );
}
// {/*onClick={"filterTipo('{{tipo}}', `${empresa[0].id_empresa}` )"*/} key={item.tipo}