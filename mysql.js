const mysql = require("mysql2");
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "yourImages"
})

exports.cadastrarImagens = (idUser, nomeArquivo, caminho) => {
    conn.query("Insert into images(idUser, nomeArquivo, caminho) values (?,?,?)", [idUser, nomeArquivo, caminho]);
}
exports.getImagemResult = (idImage, callback) =>{
    getImagem(idImage, function(err, result){
        if(err) return callback('Erro ao buscar imagens')
        return callback(null, result)
    })
}
function getImagem(idImage, callback){
    conn.query("SELECT * FROM images WHERE id = ?", [idImage], function (err, result) {
        if (err)  return callback(err);
        callback(null, result[0])
    })
}


