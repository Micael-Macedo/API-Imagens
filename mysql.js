const mysql = require("mysql2");
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "yourImages"
})

exports.cadastrarImagens = (idUser, nomeArquivo, caminho) => {
    conn.query("Insert into images(idUser, nomeArquivo, caminho) values (?,?,?)", [idUser, nomeArquivo, caminho]);
}
exports.getImagemById = (idImage, callback) =>{
    conn.query("SELECT * FROM images WHERE id = ?", [idImage], function (err, result) {
        if (err)  return callback(err,null);
        else callback(null, result[0])
    })
}
exports.getImagemById = (idImage, callback) =>{
    conn.query("SELECT * FROM images WHERE id = ?", [idImage], function (err, result) {
        if (err)  return callback(err,null);
        else callback(null, result[0])
    })
}
exports.getImagemByUser = (idUser, callback) =>{
    conn.query("SELECT * FROM images WHERE idUser = ?", [idUser], function (err, result) {
        if (err)  return callback(err,null);
        else callback(null, result)
    })
}


