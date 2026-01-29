const tagsDisponiveis = ["Front-end", "Back-end", "Full-stack", "HTML", "CSS", "JavaScript", "React", "Vue", "Angular", "Node.js", "Data Science"];

const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");
const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");
const botaoPublicar = document.querySelector(".botao-publicar");
const botaoDescartar = document.querySelector(".botao-descartar");

uploadBtn.addEventListener("click", function(e) {
    inputUpload.click();
});

inputUpload.addEventListener("change", async function(e) {
    const arquivo = e.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (error) {
            console.error("Erro ao carregar a imagem:", error);
        };
    };
});

inputTags.addEventListener("keypress", async function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    const novaTag = document.createElement("li");
                    novaTag.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    listaTags.appendChild(novaTag);
                    inputTags.value = "";
                } else {
                    alert("A tag não está disponível.");
                }
            } catch (error) {
                console.error("Erro ao verificar a disponibilidade da tag:", error);
                alert("Erro ao verificar a disponibilidade da tag. Por favor, tente novamente mais tarde.");
            };
        };
    };
});

listaTags.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-tag")) {
        const tagQueSeraRemovida = e.target.parentElement;
        listaTags.removeChild(tagQueSeraRemovida);
    };
});

botaoPublicar.addEventListener("click", async function(e) {
    e.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Projeto publicado com sucesso!");
    } catch (error) {
        console.error("Erro ao publicar o projeto:", error);
        alert("Erro ao publicar o projeto. Por favor, tente novamente mais tarde.");
    }
});

botaoDescartar.addEventListener("click", function(e) {
    e.preventDefault();
    
    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";
    listaTags.innerHTML = "";
});


function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = function() {
            resolve({ url: leitor.result, nome: arquivo.name });
        };
    
        leitor.onerror = function() {
            reject(new Error(`Erro na leitura do arquivo ${arquivo.name}`));
        };

        leitor.readAsDataURL(arquivo);
    });
};

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    });
};

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;
            if (deuCerto) {
                resolve("Projeto publicado com sucesso!");
            } else {
                reject(new Error("Erro ao publicar o projeto"));
            }
        }, 2000);
    });
};