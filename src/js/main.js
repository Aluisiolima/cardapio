
/**
 * Funcao responsavel por requisicoes a api
 * @param {Array} data - sao os dados enviado na requisicao
 * @param {String} method - e metodo de requisicao a ser ultizado
 * @param {String} url - e a url de requisicao
 * @returns 
 */
async function fetchApi(data = [], method = "GET", url) {
    try {
        // Recupera o token do sessionStorage
        const token = sessionStorage.getItem("token");
        
        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        };

        const options = {
            method,
            headers,
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        const result = await response.json();
        return result;

    } catch (error) {

        console.error("Erro ao chamar a API:", error);
        throw error;
    }
}

const link_api =  window.location.hostname != "localhost" ? "" : "http://localhost/Efast/Efast_api/";

async function render(templatePath, data, targetElementId){
    try {
        const response = await fetch(templatePath);
        const template = await response.text();

        const rendered = template.replace(/{{\s*(\w+)}}/g, (match, variavel) => {
            return data[variavel] !== undefined ? data[variavel] : match;
        });

        document.getElementById(targetElementId).innerHTML += rendered;
    } catch (error) {
        console.error(error);
    }
}
const data_nav = {
    "img_path":"foto-perfilempresa.svg",
    "name_empresa":"padrao",
    "whastapp":"+5586981132378",
    "instagram":"aluiz_nt",
    "facebook":""
};
render("./components/nav.html", data_nav, "container-nav");

const data_home = [
    {
        "tipo": "pizza"
    },
    {
        "tipo": "hamburguer"
    },
    {
        "tipo": "bebida"
    }
];

data_home.forEach(data_home => {
    render("./components/card_home.html", data_home, "container-home");
});

const data_footer = {
    "whastapp":"+5586981132378",
    "instagram":"aluiz_nt",
    "endereco":"marinopolis",
    "email":"aaluisio309@gmail.com"
}
render("./components/footer.html", data_footer, "container-footer");