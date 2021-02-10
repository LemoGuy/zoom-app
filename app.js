const express = require("express");
require('dotenv').config()
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')
const http = require('http');

const app = express();

const port = process.env.PORT || 4000;
app.use(bodyParser.json(), cors())
app.options('*', cors());

app.post("/auth", (req, res) => {
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(process.env.API_KEY + req.body.meetingNumber + timestamp + req.body.role).toString('base64')
    const hash = crypto.createHmac('sha256', process.env.API_SECRET).update(msg).digest('base64')
    const signature = Buffer.from(`${process.env.API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`).toString('base64')

    res.json({
        signature: signature
    })
});
app.use(express.static("public"));
app.listen(port);

setInterval(() => {

    http.request({
        host: 'zoom-app-sdk.herokuapp.com',
        path: '/'
    }, (respons) => {

    }).end();
}, 600000);
