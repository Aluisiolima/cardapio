async function enviaPedido(form) {
  const formulario = form.form;
  const inputs = formulario.querySelectorAll("input[required]"); // Seleciona todos os inputs obrigatórios
  let todosPreenchidos = true;

  inputs.forEach(input => {
    if (!input.value.trim()) { // Verifica se o campo está vazio ou contém apenas espaços
      todosPreenchidos = false;
      input.classList.add("erro"); // Destaca os campos vazios (opcional)
      input.addEventListener("animationend", () => {
        input.classList.remove("erro");
      });
    } else {
      input.classList.remove("erro"); // Remove o destaque se preenchido
    }
  });

  if (!todosPreenchidos) {
    return;
  }

  const formData = new FormData(formulario);

  const dados = {};
  formData.forEach((value, key) => {
    dados[key] = value;
  });

  if (dados["entrega"]) {
    dados["entrega"] = Boolean(dados["entrega"]);
  } else {
    dados["mesa"] = Boolean(dados["mesa"]);
  };

  dados["produtos"] = keyProducts;

  const result = await fetchApi(dados, "POST", `${link_api}/inserirPedido/${empresa[0].id_empresa}`);
  if (!result.error) {
    document.getElementById("container").innerHTML = ""
    render("./components/finaly_ok.html", null, "container");
    criar_mensagem(dados);
    return;
  }
  document.getElementById("container").innerHTML = ""
  render("./components/finaly_erro.html", null, "container")
  console.error(result);
}