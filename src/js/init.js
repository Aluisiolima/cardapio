
const url = window.location.href;

const params = new URLSearchParams(new URL(url).search);

// Verifica se a chave 'id' está presente
if (params.has('id')) {
    buscarDadosEmpresa(params.get("id"));
} else {
    document.title = "Efats-menu"
    buscarEmpresas();
}

async function buscarDadosEmpresa(id) {
    const dateEmpresa = await fetchApi(null,"GET",`${link_api}/pegarEmpresa/${id}`);
    if (!dateEmpresa.error){
        sessionStorage.setItem('empresa', JSON.stringify(dateEmpresa.data[0]));
        montarHome();
    }
}

async function buscarEmpresas() {
    const dateEmpresa = await fetchApi(null,"GET",`${link_api}/pegarEmpresas/`);
    if (!dateEmpresa.error){
        dateEmpresa.data.forEach(data => {
            render("./components/NotFoundEmpresa.html",data,"container");
        });
        
    }
}