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
    res.status(200).send("I'm Alive");
})

app.get('/players', (req, res) => {
    res.status(200).send(players)
})

app.get('/players/:id', (req, res) => {
    let player = players.find(player => player.id == req.params.id)
    if (player)
        res.status(200).send(player);
    else
        res.status(404).send("404")
})

app.listen(PORT, function () {
    console.log('Listening on port ' + PORT)
})