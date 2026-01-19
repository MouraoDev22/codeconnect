const tagsDisponiveis = ["Front-end", "Back-end", "Full-stack", "HTML", "CSS", "JavaScript", "React", "Vue", "Angular", "Node.js", "Data Science"]

const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");
const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

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
        }
    }
});

inputTags.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            const novaTag = document.createElement("li");
            novaTag.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
            listaTags.appendChild(novaTag);
            inputTags.value = "";
        }
    }
});

listaTags.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-tag")) {
        const tagQueSeraRemovida = e.target.parentElement;
        listaTags.removeChild(tagQueSeraRemovida);
    }
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = function() {
            resolve({ url: leitor.result, nome: arquivo.name });
        }
    
        leitor.onerror = function() {
            reject(new Error(`Erro na leitura do arquivo ${arquivo.name}`));
        }

        leitor.readAsDataURL(arquivo);
    });
}

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    });
}