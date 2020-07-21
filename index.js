const express = require('express');
const app = express();
const axios = require('axios')

const PORT = 4242
let players = []


function compare(a, b){
    return (a.id - b.id)
}

axios.get('https://alivebyacadomia.github.io/headtohead.json')
.then((res) => {
    players = (res.data.players.sort(compare));
})

app.get('/', (req, res) => {
    res.send("I'm Alive");
})

app.get('/players', (req, res) => {
    res.send(players)
})

app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT)
})