import "./Footer.css";

type FooterProps = {
    instagram: string | null;
    facebook: string | null;
    whatsapp: string;
    endereco: string;
    email: string | null;
}

export const Footer: React.FC<{ data: FooterProps }> = ({ data }) => {
    const icons = [
        { key: "whatsapp", className: "bi bi-whatsapp text-success", prefix: "https://wa.me/", text: "Whatsapp" },
        { key: "facebook", className: "bi bi-facebook", prefix: "https://www.facebook.com/", text: "Facebook" },
        { key: "instagram", className: "bi bi-instagram text-danger", prefix: "https://instagram.com/", text: "Instagram" },
        { key: "maps", className: "bi bi-map", prefix: "#", text: "" },
        { key: "email", className: "bi bi-envelope", prefix: "mailto:", text: "Email: " },
    ];

    return (
        <footer className="bg-dark text-light open-sans">
            <div className="py-3">


                <div className="col-6">
                    <p>
                        Direto do forno para aquecer o coração...
                    </p>
                </div>


                <div className="col-6 direitaF">
                    <ul>
                        {icons.map(({ key, className, prefix, text }) => {
                            const url = data?.[key as keyof FooterProps];
                            if (key === "maps") {
                                return (
                                    <li className="margin-bottom" key={key}>
                                        <a href="#" className="a" target="_blank" rel="noopener noreferrer">
                                            <span>
                                                <i className={className} style={{margin: ".5em"}}></i>
                                                 { data.endereco }
                                            </span>
                                        </a>
                                    </li>
                                );
                            }
                            if (!url) return null;
                                return (
                                    <li key={key} className="margin-bottom">
                                        <a href={`${prefix}${url}`} className={"a"} target="_blank" rel="noopener noreferrer">
                                            <span>
                                                <i className={`${className}`} style={{margin: ".5em"}}></i>
                                                {text}
                                            </span>
                                        </a>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>

            <div className="assinatura">
                Desenvolvido por <a href="https://www.instagram.com/aluiz_nt/" className="a">Aluisio Lima</a>
            </div>

        </footer>
    )
}
