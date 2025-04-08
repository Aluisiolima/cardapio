const link_api = window.location.hostname != "localhost" ? "https://efastmenu.com/api" : "http://localhost/efast/Efast_api";

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

/**
 * 
 * @param {String} templatePath - e o path para um arquivo html de template
 * @param {Array} data - sao os dados a serem dicionados em um arquivo de template
 * @param {String} targetElementId - e um id de um elemento do dow aonde aloca esse templates com seus repectivos dados
 */
async function render(templatePath, data, targetElementId) {
    try {
        const response = await fetch(templatePath);
        const template = await response.text();

        const rendered = template.replace(/{{\s*(\w+)}}/g, (match, variavel) => {
            if (typeof data[variavel] === "number" && !Number.isInteger(data[variavel])) {
              data[variavel] = (data[variavel]).toFixed(2)
            }
    
            return data[variavel] !== undefined ? data[variavel] : match;
        });

        document.getElementById(targetElementId).innerHTML += rendered;
    } catch (error) {
        console.error(error);
    }
}

function reloadCardapio(id) {
    const key = `id=${id}`;
    const baseUrl = window.location.origin + window.location.pathname;
    window.location.href = `${baseUrl}?${key}`;
}

async function calcFrete() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        let latitude =  position.coords.latitude;
        let longitude =  position.coords.longitude;
        
        const dates = {
          "lat": latitude,
          "lon": longitude
        };
       
        const frete = await fetchApi(dates, "POST", `${link_api}/calcFrete/${params.get("id")}`);

        if (!frete.error) {
            document.getElementById("frete").innerText = `frete = ${frete.data.frete}`;
        }
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, 
        maximumAge: 0    
      }
    );
  } else {
      console.error("Geolocalização não é suportada pelo navegador.");
  }
}


const empresa = [];
const produtosMain = [];