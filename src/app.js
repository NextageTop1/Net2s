// const express = require('express');
// const app = express();
// const handlebars = require('express-handlebars');

// // engine
//     app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
//     app.set('view engine', 'handlebars');

//     app.get('/cad',(req, res) => {
//         res.render('formulario')
//     })


// app.listen(3000, () => {
//   console.log('Funcionando');
// });

const express = require('express');
const app = express();
const mysql = require('mysql2');
const path = require('path');  // Adicione esta linha

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'net2s',
});

connection.connect((err) => {
    if (err) {
        console.error('Erro' + err.stack);
        return;
    }
    console.log('Conexao bem' + connection.threadId);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Corrigido: Importe o módulo path

app.get('/home', (req, res) => {
    connection.query('SELECT * FROM usuario', (err, results, fields) => {
        if (err) {
            console.error('Erro na consulta:', err.stack);
            res.status(500).send('Erro');
            return;
        }

        res.send(results);
    });
});

app.get('/', (req, res) => {
    connection.query('SELECT * FROM usuario', (err, results, fields) => {
        if (err) {
            console.error('Erro na consulta:', err.stack);
            res.status(500).send('Erro');
            return;
        }
        res.render('formulario', { options: results });
    });
});

app.listen(3000, () => {
    console.log("Funcionando");
});
