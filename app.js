const express = require("express")
const app = express();
const bp = require("body-parser");
const page = __dirname + "/views/pages/";

const fotoRoute = require("./router/Foto");

app.use(express.static(__dirname + "public"));
app.use(bp.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(page + "index.html")
})
app.use("/foto", fotoRoute);

module.exports = app;