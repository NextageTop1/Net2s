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
            const ul = document.createElement('ul');
            data.results.forEach(result => {
              const li = document.createElement('li');
              li.textContent = result.nome_da_coluna; // Substitua pelo nome da sua coluna
              ul.appendChild(li);
            });
            resultsContainer.appendChild(ul);
          } else {
            resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
          }
        })
        .catch(error => {
          console.error('Erro ao obter resultados:', error);
        });
            
app.listen(3000, () => {
    console.log("Funcionando");
});