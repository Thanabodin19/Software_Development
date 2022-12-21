const { request } = require('express')
const express = require('express')
const app = express()


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('*', function(req, res){
    res.sendFile(__dirname + '/public/Error.html')
})

app.listen(3000, () => {
    console.log("Start Server at Port [3000]")
})