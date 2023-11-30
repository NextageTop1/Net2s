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
const path = require('path');

const session = require('express-session'); // Adicione esta linha
const flash = require('connect-flash')

const bcrypt = require('bcrypt') 

const bodyParser = require('body-parser')
const rd = require('node:crypto')

//Crypitografia
// const crypto = require('crypto');
// ... outras configurações
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
// Configuração da sessão
app.use(session({
    secret: 'net2s', // Chave secreta para assinar a sessão (pode ser qualquer string)
    resave: true,
    saveUninitialized: true
    // Você pode adicionar outras opções conforme necessário
}));
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
    console.log('Conexao bem ' + connection.threadId);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Corrigido: Importe o módulo path


app.use(express.static(path.join(__dirname,'../public')))

app.get('/', (req, res) => {
  connection.query('SELECT * FROM usuario', (err, results, fields) => {
      if (err) {
          console.error('Erro na consulta:', err.stack);
          res.status(500).send('Erro');
          return;
      }
      console.log(req.session.usuario)
      const usuario = req.session.usuario
      res.render('index',{ options: results, usuario });
  });
// app.get('/', (req, res) => {
//   res.render('index')
})


app.get('/formUsuario', (req, res) => {
  res.render('formUsuario');
});

app.get('/usuario', (req, res) => {
  const usuId = req.query.usu_id;

  if (!usuId) {
      return res.render('formUsuario', { error: 'Por favor, informe o ID do usuário.' });
  }

  const selectQuery = 'SELECT * FROM usuario WHERE usu_id = ?';

  connection.query(selectQuery, [usuId], (err, results, fields) => {
      if (err) {
          console.error('Erro na consulta:', err.stack);
          return res.status(500).send('Erro ao buscar usuário');
      }

      if (results.length === 0) {
          return res.render('formUsuario', { error: 'Usuário não encontrado.' });
      }

      const usuario = results[0];
      return res.render('usuario', { usuario });
  });
});


app.get('/formulario', (req, res) => {
  res.render('formulario');
});

app.post('/cadastrar', async (req, res) => {
    const {
      nome,
      telefone,
      senha,
      email,
      permissao,
      end_cobranca,
      end_entrega
    } = req.body;
    const insertQuery = `
      INSERT INTO usuario (usu_nome, telefone, senha, usu_email, usu_permissao, usu_end_cobranca, usu_end_entrega)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  // const senhac = crypto.createHash('sha256').update(senha).digest('hex');
  const randomSalt = rd.randomInt(10,16)
  const senhac =  await bcrypt.hash(senha, randomSalt)
    try {
      const results = await new Promise((resolve, reject) => {
        connection.query(insertQuery, [nome, telefone, senhac, email, permissao, end_cobranca, end_entrega], (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        });
      });
  
      console.log('Usuário cadastrado com sucesso!');
      res.redirect('/'); // ou redirecione para outra página após o cadastro
    }catch (error) {
      console.error('Erro ao cadastrar:', error.stack);
      res.status(500).send('Erro ao cadastrar');
    }
});


app.get('/login' , (req,res) => {
  const msgError = req.query.erro || '';
  res.render('log', { msgError})
})

app.post('/login', async (req, res) => {
  const {email,senha} = req.body
  const selectQuery = 'SELECT * FROM usuario WHERE usu_email = ?';
  var usuario = {}
  const results = await new Promise((resolve, reject) => {
  connection.query(selectQuery,[email] , (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(usuario = results[0])
  });
})
//1234
// const senhac = crypto.createHash('sha256').update(senha).digest('hex');
const senhac = await bcrypt.compare(senha,usuario.senha)
console.log(senhac)

  if(senhac === true){
    req.session.usuario = usuario
    // const senhac = crypto.createHash('sha256').update(senha).digest('decryption');
    res.redirect('/perfil')
}
  else {
  res.redirect('/login?erro=Senha Incorreta.')
}

  //   res.redirect('/perfil')
  // req.session.loggedInUser = true; // Exemplo de como definir um valor na sessão
  // req.session.username = 'NomeDoUsuario'; // Outro exemplo de dado na sessão
  // Redirecione ou faça qualquer outra coisa após o login
});
app.get('/perfil', (req, res) =>{
  const usuario = req.session.usuario
  console.log(usuario.usu_id)
  res.render('perfil',{usuario})

})

app.get('/PP1',(req,res)=>{
  const usuario = req.session.usuario
  res.render('PP1', {usuario})
})
app.post('/PP1',(req,res)=>{
  res.redirect('/carrinho?caminho= tenis/Tênis Under Armour Basquete Spawn 3 Masculino/39W-3127-026_zoom3.jpg')
})


app.get('/carrinho', async(req , res) => {
  const usuario = req.session.usuario
  var produto = document.querySelector("underaramour") || '';


  const caminho = req.query.caminho


  console.log(produto)

  const produtoQuery = 'SELECT * FROM produto WHERE prod_nome = ?'
  const results =  await new Promise((resolve, reject) => {
  connection.query(produtoQuery,produto,(err, results) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(produto = results[0])
  })
})
  if(usuario){
    res.render('carrinho',{usuario,produto,caminho})
  }else{
    res.redirect('/login')
  }

})

// const senhaOriginal = 'minhaSenha';


// console.log('Hash da senha:', senhac);



app.listen(3000, () => {
    console.log("Funcionando");
});
