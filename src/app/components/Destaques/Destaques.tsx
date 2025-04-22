import "./Destaques.css";
import { Load } from "../Load/Load";
import { Destaques } from "../../types/Destaques.type";

export const Destaque: React.FC<{data: Destaques[] | null}> = ({ data }) => {    
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