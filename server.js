// Importing express module
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
mongoose.connect('mongodb+srv://admin:lore0897@cluster0.3ybrji2.mongodb.net/?retryWrites=true&w=majority');
const bcrypt = require('bcrypt');
const fs = require("fs");
const salt = bcrypt.genSaltSync(10);
const Schema = mongoose.Schema;
const userScheme = new Schema({token: String, password: String}, {versionKey: false});
const User = mongoose.model("Users", userScheme);
const app = express();
const bodyParser = require("express");
var fileupload = require("express-fileupload");
const path = require("path");
app.use(fileupload());
app.use(bodyParser.urlencoded({extended: false}));
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client/build/'));
app.use(cors(corsOptions))

app.use(express.json());
app.get('/', async function (req, res) {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.post('/api/create', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const userToken = req.body.token;
    const userPassword = req.body.password;
    const pass = await bcrypt.hash(userPassword, salt)
    const user = new User(
        {
            token: userToken,
            password: pass
        }
    )
    await user.save()
    res.send(200)
})

app.post('/api/login', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const userToken = req.body.token;
    const userPassword = req.body.password;
    const user = await User.findOne({token: userToken})
    if (user) {
        if (await bcrypt.compare(userPassword, user.password)) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }
})
app.post('/get_data', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const token = req.body.token
    const name = req.body.name
    const txt = req.files.file.data.toString()
    if (!fs.existsSync(__dirname + '/public/' + token)) {
        fs.mkdirSync(__dirname + '/public/' + token)
    }
    if (!fs.existsSync(__dirname + '/public/' + token + '/' + name)) {
        fs.mkdirSync(__dirname + '/public/' + token + '/' + name)
    }
    const now = new Date();
    const dt = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()};${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`
    fs.writeFileSync(__dirname + '\\public\\' + token + '\\' + name + '\\' + dt + '.txt', txt)
    return res.sendStatus(200);
})
app.post('/get_all_files', async (req, res) => {
    const files = fs.readdirSync(__dirname + '/public/' + req.body.token);
    res.send({ret: files})
})
app.post('/get_dir', async (req, res) => {
    const files = fs.readdirSync(__dirname + '/public/' + req.body.token + '/' + req.body.name);
    res.send({ret: files})
})
app.post('/get_text', async (req, res) => {
    let files = fs.readFileSync(__dirname + '/public/' + req.body.token + '/' + req.body.name + '/' + req.body.date,
        {encoding: 'utf-8', flag: 'r'});
    files = files.replace(/\0/g, '');
    res.send({ret: files})
})
app.post('/rename', async (req, res) => {
    if (fs.existsSync(__dirname + '\\public\\' + req.body.token + '\\' + req.body.nw)) {
        const files = fs.readdirSync(__dirname + '/public/' + req.body.token);
        return res.send({ret: files})
    }
    fs.renameSync(__dirname + '/public/' + req.body.token + '/' + req.body.last, __dirname + '/public/' + req.body.token + '/' + req.body.nw);
    const files = fs.readdirSync(__dirname + '/public/' + req.body.token);
    res.send({ret: files})
})
app.listen(3000, () => {
    console.log('server is up');
});
