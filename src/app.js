const express = require('express');
const db = require('./serve');
const app = express();

app.get('/home', (req, res) => {
    db.connection.query('SELECT * FROM usuario', (err, results, fields) => {
        if (err) {
            console.error('Erro na consulta:', err.stack);
            res.status(500).send('Erro');
            return;
        }

        // Aqui, assumindo que você tem um arquivo HTML chamado 'index.html'
        res.json(results);
    });
});

fetch('/home')
    .then(response => response.json())
    .then(data => {
        const rc = document.getElementById('rc')
        if (data.results.length > 0){
            
        } 


})
app.listen(3000, () => {
    console.log("Funcionando");
});