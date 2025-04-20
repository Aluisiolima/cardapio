import "./Nav.css";
import logo from "../../asset/defualt/image.png";
import { useState } from "react";

type NavProps = {
    path: string;
    nome_empresa: string;
    whatsapp: string | number;
    instagram: string | null;
    facebook: string | null;
}

export const Nav: React.FC<{ data: NavProps, onTroca: (nome: string) => void }> = ({ data, onTroca }) => {
    const [cardapio, setCadapio] = useState<boolean>(false);

    const icons = [
        { key: "whatsapp", className: "bi bi-whatsapp", prefix: "https://wa.me/" },
        { key: "facebook", className: "bi bi-facebook", prefix: "https://www.facebook.com/" },
        { key: "instagram", className: "bi bi-instagram", prefix: "https://instagram.com/" },
    ];

    return (
        <nav className="cabecario">
            <div className="logo">
                <img
                    src={data.path}
                    alt="logo"
                    height={30}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = logo }}
                />
                <h1>{data.nome_empresa}</h1>
            </div>

            <div className="operacional">
                <div className="link-navegacao" id="navegacao">
                    <div className="links">
                        <p 
                        id="home" onClick={(e) => { onTroca("Home"); setCadapio(false) }} style={{ textDecoration: cardapio === false ? "underline" : "none" }}>home</p>
                    </div>
                    <div className="links">
                        <p id="cardapio" onClick={(e) => { onTroca("Cardapio"); setCadapio(true) }} style={{ textDecoration: cardapio === true ? "underline" : "none" }}>cardapio</p>
                    </div>
                </div>

                <div className="contatos">
                    <ul>
                        {icons.map(({ key, className, prefix }) => {
                            const url = data?.[key as keyof NavProps];
                            if (!url) return null;
                            return (
                                <li key={key}>
                                    <a href={`${prefix}${url}`} target="_blank" rel="noopener noreferrer">
                                        <i className={`${className}`} style={{ fontSize: "1.5em", marginLeft: ".5em" }}></i>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}