const express = require('express');
const app = express();
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password:'',
    database: 'net2s',
})

connection.connect((err) => {
    if(err){
        console.error('Erro'+err.stack);

        return;
    }
    console.log('Conexao bem'+connection.threadld);
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    connection.query('SELECT * FROM usuario', (err, results, fields) => {
        if (err) {
            console.error('Erro na consulta:', err.stack);
            res.status(500).send('Erro');
            return;
        }

        res.render('index', { options: results });
    });
});

app.listen(3000, () => {
    console.log("Funcionando");
});
