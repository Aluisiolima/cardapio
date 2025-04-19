import { JSX, useEffect, useState } from "react"
import { useParams } from "wouter"
import { Empresa } from "../../types/Empresa.type";
import { fetchApi } from "../../utils/req";
import { navigate } from "wouter/use-browser-location";
import { Nav } from "../../components/Nav/Nav";
import { Main } from "../../components/Main/Main";
import { Footer } from "../../components/Footer/Footer";
import { Destaques } from "../../components/Destaques/Destaques";
import { Menu } from "../../components/Menu/Menu";
import { Load } from "../../components/Load/Load";

export const Cardapio: React.FC = () => {
    const { id } = useParams();
    const [empresaData, setEmpresaData] = useState<Empresa | null | "notfound">(null);
    const [component, setComponent] = useState<string>("Home");

    const components: Record<string, JSX.Element> = {
        Home: <Destaques />,
        Cardapio: <Menu />,
        Load: <Load />,
       
    }

    useEffect(() => {
        const getEmpresa = async () => {
            try {
                const result = await fetchApi<Empresa>(null, "GET", `${process.env.REACT_APP_LINK_API}/pegarEmpresa/${id}`);
                setEmpresaData(result);
            } catch (error) {
                console.error(error);
                setEmpresaData("notfound");
            }
        };

        getEmpresa();
    }, [id]);

    useEffect(() => {
        if (empresaData === "notfound") {
            navigate("/");
        }
    }, [empresaData]);

    if (!empresaData || empresaData === "notfound") return <></>;

    window.document.title = empresaData.nome_empresa;
    return (
        <div className="container">
            <Nav data={empresaData} onTroca={setComponent}/>
            <Main children={components[component]}/>
            <Footer data={empresaData}></Footer>
        </div>
    )
}
