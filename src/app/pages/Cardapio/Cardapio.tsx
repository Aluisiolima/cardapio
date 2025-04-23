import { JSX, useEffect, useState } from "react"
import { useParams } from "wouter"
import { Empresa } from "../../types/Empresa.type";
import { fetchApi } from "../../utils/req";
import { Nav } from "../../components/Nav/Nav";
import { Main } from "../../components/Main/Main";
import { Footer } from "../../components/Footer/Footer";
import { Destaque } from "../../components/Destaques/Destaques";
import { Menu } from "../../components/Menu/Menu";
import { Load } from "../../components/Load/Load";
import { Product } from "../../types/Product.type";
import { Destaques } from "../../types/Destaques.type";
import {  } from "../../asset/defualt"
import { Carinho } from "../../components/Carinho/Carinho";
import { Delivery } from "../../components/CardEntrega/Delivery";
import { Mesa } from "../../components/CardEntrega/Mesa";

export const Cardapio: React.FC = () => {
    const { id } = useParams();
    const [empresaData, setEmpresaData] = useState<Empresa | null >(null);
    const [produtoData, setDataProduto] = useState<Product[] | null>(null);
    const [destaquesData, setDataDestaques] = useState<Destaques[] | null>(null);
    const [component, setComponent] = useState<string>("Home");

    const components: Record<string, JSX.Element> = {
        Home: <Destaque data={destaquesData}/>,
        Cardapio: <Menu data={produtoData} onTroca={setComponent}/>,
        Carinho: <Carinho onTroca={setComponent}/>,
        Delivery: <Delivery />,
        Mesa: <Mesa />,
        Load: <Load />,
       
    }

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [empresa, produtos, destaques] = await Promise.all([
                    fetchApi<Empresa>(null, "GET", `/pegarEmpresa/${id}`),
                    fetchApi<Product[]>(null, "GET", `/pegarProdutos/${id}`),
                    fetchApi<Destaques[]>(null, "GET", `/pegarProdutos/${id}/main`)
                ]);
    
                setEmpresaData(empresa);
                setDataProduto(produtos);
                setDataDestaques(destaques);
            } catch (error) {
                console.error(error);
                setEmpresaData(null);
                setDataProduto(null);
                setDataDestaques(null);
            }
        };
    
        fetchAllData();
    }, [id]);
    

    if (!empresaData) return <Load />;


    window.document.title = empresaData.nome_empresa;
    return (
        <div className="container">
            <Nav data={empresaData} onTroca={setComponent}/>
            <Main children={components[component]}/>
            <Footer data={empresaData}></Footer>
        </div>
    )
}
