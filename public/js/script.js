async function buscarImagem() {
    id = $("#imgId").val()
    $(".imagens").empty();
    await fetch(`http://localhost:8090/foto/imagens/${id}`).then(response => response.json()).then(imagem => {
        $(".imagens").append(`
        <img src="http://localhost:8090/images/${imagem.caminho}" alt="${imagem.nomeArquivo}" id="imagem">
        <button onclick="removerfundo(${imagem.id})">Remover Fundo</Button>
        `)
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

async function removerfundo(idImg) {
    var myHeaders = new Headers();
    var myInit = {
        method: 'get',
        headers: myHeaders,
    };
    await fetch(`http://localhost:8090/foto/removerfundo/${idImg}`, myInit)
        .then(response => response.blob())
        .then(data => {
            const url = URL.createObjectURL(data)
            let img = $("#imagemBgRemovida");
            img.onload = () => {
                URL.revokeObjectURL(url)
                resolve(img)
            }
            img.src = url
        })
        .catch(err => console.log(err))
}
