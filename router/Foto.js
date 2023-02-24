const express = require("express");
const router = express.Router();
const multer = require("multer");
const fetch = require("node-fetch")
const db = require("../mysql")
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path')

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
    db.cadastrarImagens(req.body.idUser, req.file.originalname, req.file.filename)
    res.redirect("http://localhost:8090/");
})
router.get("/removerfundo/:id", async (req, res, next) => {
    // const inputPath = path.join(process.cwd(), `public/images/${imagem.caminho}`);
    let result = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'X-Api-Key': 'ciunUWx66wTKKErDT9ubprAh',
            'Content-Type': 'application/json'
        },
        body: '{"image_url":"https://www.remove.bg/example.jpg","size":"auto"}'
    }).then(response => { 
        if (response.status != 200) return console.error('Error:', response.status, response.statusText);
        return response.blob();
    }).catch(error => {
        return console.error('Request failed:', error);
    });
    res.send((result));
});
router.post("/removerfundo/:id", async (req, res, next) => {
    // const inputPath = path.join(process.cwd(), `public/images/${imagem.caminho}`);
    let result = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'X-Api-Key': 'ciunUWx66wTKKErDT9ubprAh',
            'Content-Type': 'application/json'
        },
        body: '{"image_url":"https://www.remove.bg/example.jpg","size":"auto"}'
    }).then(response => { 
        if (response.status != 200) return console.error('Error:', response.status, response.statusText);
        return response.type;
    }).catch(error => {
        return console.error('Request failed:', error);
    });
    res.send(result);
});

router.get("/imagens/:id", (req, res, next) => {
    db.getImagemById(req.params.id, function (err, imagens) {
        if (err) { res.status(404) }
        else { res.status(200).json(imagens) }
    })
});
router.get("/imagens/user/:id", (req, res, next) => {
    db.getImagemByUser(req.params.id, function (err, imagens) {
        if (err) { res.status(404) }
        else { res.status(200).json(imagens) }
    })
});

module.exports = router;