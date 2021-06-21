const main = document.querySelector("main");
//requisição AJAX
function carregarHTML(url) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      main.innerHTML = html;
    });
}

/*function carregarHome() {
  fetch("html/home.html")
    .then((res) => res.text())
    .then((html) => {
      main.innerHTML = html;
      const section = document.querySelector("section");
      fetch("http://localhost:3000/paises")
        .then((res) => res.json())
        .then((paises) => {
          const imgFoto = document.querySelector("#items > div > div.row.text-center.text-lg-left > div > div > a > img");
          imgFoto.src = "../img/" + paises.foto;
        });
    });
}
*/

carregarHome();

//Criacao dos CADASTROS/CARDS
function criarCard(pais) {
  const divCol = document.createElement("div");
  divCol.classList.add("col-lg-3", "col-md-4", "col-6");
  divCol.setAttribute("data-aos", "fade-left");
  divCol.setAttribute("data-aos-delay", "300");
  const divImgBox = document.createElement("div");
  divImgBox.setAttribute("href", pais.link);
  divImgBox.onclick = function (e) {
    alert("aaaaaaaaaaa");
  };
  divImgBox.classList.add("imageBox");
  const caixa = document.createElement("a");
  caixa.classList.add("d-block", "mb-4", "h-100");
  caixa.setAttribute("data-toggle", "lightbox");
  caixa.setAttribute("data-gallery", "example-gallery");
  const imagem = document.createElement("img");
  imagem.classList.add("img-fluid", "img-thumbnail");
  imagem.src = "../img/" + pais.foto;

  const divTextBox = document.createElement("div");
  divTextBox.classList.add("textBox");
  const nome = document.createElement("h5");
  nome.innerHTML = pais.nome;

  divTextBox.appendChild(nome);

  divImgBox.appendChild(caixa);
  divImgBox.appendChild(imagem);
  divImgBox.appendChild(divTextBox);

  divCol.appendChild(divImgBox);

  return divCol;
}

//EDITAR-----
function editarPaises(id) {
  fetch("html/editarCadastros.html")
    .then((res) => res.text())
    .then((html) => {
      main.innerHTML = html;
      fetch("http://localhost:3000/paises/" + id)
        .then((res) => res.json())
        .then((pais) => {
          const inputId = document.forms.pais.id;
          inputId.value = pais.id;
          const InputNome = document.forms.pais.nome;
          InputNome.value = pais.nome;
          const btnSalvar = document.getElementById("btnSalvar");
          btnSalvar.onclick = function (e) {
            e.preventDefault();
            const inputId = document.forms.pais.id;
            const inputNome = document.forms.pais.nome;

            const header = {
              method: "PUT",
              headers: {
                Accep: "application/json",
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                id: inputId.value,
                nome: inputNome.value,
              }),
            };
            fetch("http://localhost:3000/paises/" + id, header).then(() => {
              carregarCadastro();
            });
          };
          const btnCancelar = document.getElementById("btnCancelar");
          btnCancelar.onclick = function (e) {
            e.preventDefault();
            carregarCadastro();
          };
        });
    });
}

//Adicionar
function adicionarPais() {
  fetch("html/adicionarCadastro.html")
    .then((res) => res.text())
    .then((html) => {
      main.innerHTML = html;
      const btnSalvar = document.getElementById("btnSalvar");
      btnSalvar.onclick = function (e) {
        e.preventDefault();

        const inputNome = document.forms.pais.nome;

        const header = {
          method: "POST",
          headers: {
            Accep: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            nome: inputNome.value,
          }),
        };
        fetch("http://localhost:3000/paises/", header).then(() => {
          carregarCadastro();
        });
      };
      const btnCancelar = document.getElementById("btnCancelar");
      btnCancelar.onclick = function (e) {
        e.preventDefault();
        carregarCadastro();
      };
    });
}

//Excluir
function excluirPais(id) {
  fetch("html/excluirCadastro.html")
    .then((res) => res.text())
    .then((html) => {
      main.innerHTML = html;
      fetch("http://localhost:3000/paises/" + id)
        .then((res) => res.json())
        .then((pais) => {
          const inputId = document.forms.pais.id;
          inputId.value = pais.id;
          const InputNome = document.forms.pais.nome;
          InputNome.value = pais.nome;
          const btnSalvar = document.getElementById("btnSalvar");
          btnSalvar.onclick = function (e) {
            e.preventDefault();
            const header = {
              method: "DELETE",
              headers: {
                Accep: "application/json",
                "Content-type": "application/json",
              },
            };

            fetch("http://localhost:3000/paises/" + id, header).then(() => {
              carregarCadastro();
            });
          };
          const btnCancelar = document.getElementById("btnCancelar");
          btnCancelar.onclick = function (e) {
            e.preventDefault();
            carregarCadastro();
          };
        });
    });
}

function criarLinhaDePaises(pais) {
  const trLinha = document.createElement("tr");
  const tdId = document.createElement("td");
  tdId.innerHTML = pais.id;
  const tdNome = document.createElement("td");
  tdNome.innerHTML = pais.nome;
  const tdAcoes = document.createElement("td");
  const aEditar = document.createElement("a");
  aEditar.href = "";
  aEditar.onclick = function (e) {
    e.preventDefault();
    editarPaises(pais.id);
  };
  aEditar.innerHTML = "Editar";
  const aExcluir = document.createElement("a");
  aExcluir.href = "";
  aExcluir.onclick = function (e) {
    e.preventDefault();
    excluirPais(pais.id);
  };
  aExcluir.innerHTML = "Deletar";

  trLinha.appendChild(tdId);
  trLinha.appendChild(tdNome);
  trLinha.appendChild(tdAcoes);
  tdAcoes.appendChild(aEditar);
  tdAcoes.appendChild(aExcluir);

  return trLinha;
}
/*<tr>
          <td>1</td>
          <td>Nome</td>
          <td> 
            <a href="#" style="width: 40px">Editar</a>
            <a href="#" style="width: 40px">Deletar</a>
          </td>
        </tr>
        */

function carregarHome() {
  fetch("html/home.html")
    .then((res) => res.text())
    .then((html) => {
      main.innerHTML = html;
      const section = document.querySelector(
        ".row",
        "text-center",
        "text-lg-left"
      );
      fetch("http://localhost:3000/paises")
        .then((res) => res.json())
        .then((paises) => {
          paises.forEach((pais) => {
            const card = criarCard(pais);
            section.appendChild(card);
            //console.log(section);
            //console.log(card);
          });
        });
    });
}

function carregarCadastro() {
  fetch("html/cadastros.html")
    .then((res) => res.text())
    .then((html) => {
      main.innerHTML = html;
      const tbody = document.querySelector(
        "#items > div.direita > table > tbody"
      );
      fetch("http://localhost:3000/paises")
        .then((res) => res.json())
        .then((listaDePaises) => {
          const btnAdicionar = document.querySelector(
            "#items > div.direita > div > a"
          );
          btnAdicionar.onclick = function (e) {
            e.preventDefault();
            adicionarPais();
          };

          listaDePaises.forEach((pais) => {
            const linhaDePaises = criarLinhaDePaises(pais);
            tbody.appendChild(linhaDePaises);
          });
        });

      const btnListarPaises = document.querySelector("#btnListarPaises");
      btnListarPaises.onclick = function (e) {
        e.preventDefault();
        carregarCadastro();
      };
      const btnListarLogado = document.querySelector("#btnListarLogado");
      btnListarLogado.onclick = function (e) {
        e.preventDefault();
        alert("aaaaaaa");
      };
    });
}

//Eventos onclick
const mnHome = document.querySelector("#menuHome");
mnHome.onclick = function (event) {
  event.preventDefault();
  carregarHome();
};

const mnLogin = document.querySelector("#menuLogin");
mnLogin.onclick = function (event) {
  event.preventDefault();
  carregarHTML("html/login.html");
};

const mnSobre = document.querySelector("#menuSobre");
mnSobre.onclick = function (event) {
  event.preventDefault();
  carregarHTML("html/sobre.html");
};

const mnCadastros = document.querySelector("#menuCadastros");
mnCadastros.onclick = function (event) {
  event.preventDefault();
  carregarCadastro();
};
