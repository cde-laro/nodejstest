const express = require('express');
const app = express();
const axios = require('axios')

const PORT = 4242


function compare(a, b){
    return (a.id - b.id)
}

async function fetch(){
    let players
    await axios.get('https://alivebyacadomia.github.io/headtohead.json')
    .then((res) => {
        players = (res.data.players.sort(compare));
    })
    return players
} 


app.get('/', (req, res) => {
    res.status(200).send("I'm Alive");
})

app.get('/players', async (req, res) => {
    let players = await fetch()
    res.status(200).send(players)
})

app.get('/players/:id', async (req, res) => {
    let players = await fetch()
    let player = players.find(player => player.id == req.params.id)
    if (player)
        res.status(200).send(player);
    else
        res.status(404).send("404")
})

app.listen(PORT, function () {
    console.log('Listening on port ' + PORT)
})