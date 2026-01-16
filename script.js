const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name });
        }
    
        leitor.onerror = () => {
            reject(new Error(`Erro na leitura do arquivo ${arquivo.name}`));
        }

        leitor.readAsDataURL(arquivo);
    });
}