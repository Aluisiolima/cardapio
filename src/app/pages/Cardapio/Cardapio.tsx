import { useEffect, useState } from "react"
import { useParams } from "wouter"
import { Empresa } from "../../types/Empresa.type";
import { fetchApi } from "../../utils/req";
import { Nav } from "../../components/Nav/Nav";
import { navigate } from "wouter/use-browser-location";

export const Cardapio: React.FC = () => {
    const { id } = useParams();
    const [empresaData, setEmpresaData] = useState<Empresa | null | "notfound">(null);

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

    return (
        <div>
            <Nav data={empresaData} />
            
        </div>
    )
}
