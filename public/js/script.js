async function buscarImagem() {
    id = $("#imgId").val()
    $(".imagens").empty();
    await fetch(`http://localhost:8090/foto/imagens/${id}`).then(response => response.json()).then(imagem => {
        $(".imagens").append(`<img src="http://localhost:8090/images/${imagem.caminho}" alt="${imagem.nomeArquivo}">`)
    })
}
async function buscarImagemUsuario() {
    id = $("#userId").val()
    $(".imagens").empty();
    await fetch(`http://localhost:8090/foto/imagens/user/${id}`).then(response => response.json()).then(imagens => {
        imagens.forEach(imagem => {
            $(".imagens").append(`<img src="http://localhost:8090/images/${imagem.caminho}" alt="${imagem.nomeArquivo}">`)
        });
    })
}