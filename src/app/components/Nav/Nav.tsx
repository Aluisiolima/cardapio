type NavProps = {
    logo: string;
    nome: string;
    whatsapp: string | number;
    instagram: string;
    facebook: string;
}
export const Nav: React.FC<NavProps> = ({logo,facebook,instagram,nome,whatsapp}) => {
    return(
        <nav className="cabecario">
            <div className="logo">
                <img
                src={logo}
                alt="logo"
                height={30}
                // onError={() => this.src = logo}
                />
                <h1>{nome}</h1>
            </div>

            <div className="operacional">
                <div className="link-navegacao" id="navegacao">
                <div className="links">
                    {/* <p id="home" onClick={homeAtive()">home</p> */}
                </div>
                <div className="links">
                    {/* <p id="cardapio" onClick="cardapioAtive()">cardapio</p> */}
                </div>
                </div>

                <div className="contatos">
                <ul>
                    <li>
                    <a href="https://wa.me/{{whatsapp}}">
                        {/* <i className="bi bi-whatsapp" style="font-size: 1.5em"></i> */}
                    </a>
                    </li>
                    
                </ul>
                </div>
            </div>
        </nav>
    );
}