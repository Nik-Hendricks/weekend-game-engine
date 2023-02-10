

import express from 'express'
const app = express();
import path from 'path'
import http from 'http';
import fs from 'fs'     
//routes
var httpServer = http.createServer(app);

app.use(express.static('public'));

app.get('/Engine/:file', (req, res) => {
    res.header({
        'Content-Type': 'text/javascript',
        'Content-Size': getFilesizeInBytes(`./Engine/${req.params.file}`)
      });
      res.sendFile(`./Engine/${req.params.file}`, {root: './'})
})

app.get('/Engine/GUI/:file', (req, res) => {
    res.header({
        'Content-Type': 'text/javascript',
        'Content-Size': getFilesizeInBytes(`./Engine/GUI/${req.params.file}`)
      });
      res.sendFile(`./Engine/GUI/${req.params.file}`, {root: './'})
})

app.get('/js/:file', (req, res) => {
    res.header({
        'Content-Type': 'text/javascript',
        'Content-Size': getFilesizeInBytes(`./js/${req.params.file}`)
      });
      res.sendFile(`./js/${req.params.file}`, {root: './'})
})

app.get("/images/:file",function(req, res){
    res.header({
      'Content-Type': 'image/png',
      'Content-Size': getFilesizeInBytes(`./images/${req.params.file}`)
    });
    res.sendFile(`./images/${req.params.file}`, {root: './'})
})

app.get('*', (req, res) => {
    res.sendFile(`index.html`, {root: './'})
})

httpServer.listen(80);


function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}
