const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

// engine
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    app.get('/cad',(req, res) => {
        res.render('formulario')
    })


app.listen(3000, () => {
  console.log('Funcionando');
});