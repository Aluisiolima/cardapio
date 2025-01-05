
const url = window.location.href;

const params = new URLSearchParams(new URL(url).search);

// Verifica se a chave 'id' está presente
if (params.has('id')) {
    buscarDadosEmpresa(params.get("id"));
} else {
    buscarEmpresas();
}

async function buscarDadosEmpresa(id) {
    const dateEmpresa = await fetchApi(null,"GET",`${link_api}/pegarEmpresa/${id}`);
    if (!dateEmpresa.error && dateEmpresa.data.length !== 0){
        empresa.push(dateEmpresa.data[0]);
        montarHome();
    }else {
        buscarEmpresas();
    }
}

async function buscarEmpresas() {
    document.title = "Efats-menu"
    let url = new URL(window.location.href);

    url.search = "";
   
    window.history.replaceState({}, "", url);

    const dateEmpresa = await fetchApi(null,"GET",`${link_api}/pegarEmpresas/`);
    if (!dateEmpresa.error){
        dateEmpresa.data.forEach(data => {
            render("./components/NotFoundEmpresa.html",data,"container");
        });
        
    }
}