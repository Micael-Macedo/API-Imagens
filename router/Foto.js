const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../mysql")
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const formData = new FormData();
formData.append('size', 'auto');
formData.append('image_url', 'https://www.remove.bg/example.jpg');

const inputPath = "./public/images/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, inputPath)
    },
    filename: function (req, file, cb) {
        const extensaoArquivo = file.originalname.split('.')[1];

        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');

        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
})

const upload = multer({ storage: storage });

router.get('/', (req, res, next) => {
    res.send("Estou funcionando")
})
router.post("/", upload.single('image'), (req, res, next) => {
    console.log(req.file);

    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_url', `http://localhost:8090/public/images/${req.file.destination}`);

    axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: formData,
        responseType: 'arraybuffer',
        headers: {
            ...formData.getHeaders(),
            'X-Api-Key': 'ciunUWx66wTKKErDT9ubprAh',
        },
        encoding: null
    })
        .then((response) => {
            if (response.status != 200) return console.error('Error:', response.status, response.statusText);
            fs.writeFileSync("no-bg.png", response.data);
        })
        .catch((error) => {
            return console.error('Request failed:', error);
        });
    db.cadastrarImagens(req.body.idUser, req.file.originalname, req.file.filename)
    res.redirect("http://localhost:8090/");
})

router.get("/imagens/:id", (req, res, next) => {
    id = req.params.id
    db.getImagemResult(function (id, imagem) {
        res.json(imagem)
    })
});

module.exports = router;