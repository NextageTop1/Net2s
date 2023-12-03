
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
try {
  const senhac = await bcrypt.compare(senha, usuario.senha);
  if (senhac) {
     // Usuário autenticado
     req.session.usuario = usuario;
     res.redirect('/perfil');
  } else {
     res.redirect('/login?erro=Senha Incorreta.');
  }
} catch (error) {
  console.error('Erro ao comparar senhas:', error);
  res.status(500).send('Erro ao comparar senhas');
}


  //   res.redirect('/perfil')
  // req.session.loggedInUser = true; // Exemplo de como definir um valor na sessão
  // req.session.username = 'NomeDoUsuario'; // Outro exemplo de dado na sessão
  // Redirecione ou faça qualquer outra coisa após o login
});
app.get('/perfil', (req, res) =>{
  const usuario = req.session.usuario
  res.render('perfil',{usuario})
})

app.get('/PP1',(req,res)=>{
  const usuario = req.session.usuario
  res.render('PP1', {usuario})
})


app.get('/PP2',(req,res)=>{
  const usuario = req.session.usuario
  res.render('PP2', {usuario})
})


app.get('/carrinho', async(req , res) => {
  if(!req.session.carrinho){
    req.session.carrinho = []
  }
  console.log(req.session.usuario)
  const usuario = req.session.usuario
  const carrinho = req.session.carrinho
  const caminho = req.session.imgProduto
  

  if(usuario){
    res.render('carrinho',{usuario,carrinho,caminho,carrinho})
  }else{
    res.redirect('/login')
  }

})

app.post('/add-carrinho', async(req,res)=>{
  req.session.imgProduto = []
  req.session.imgProduto.push(req.body.caminhoprod)
  if(!req.session.carrinho){ 
    req.session.carrinho = []
  }
  var produto = req.body.idProduto || '';
  const carrinho = req.session.carrinho || [];
  console.log(produto)
  const produtoQuery = 'SELECT * FROM produto WHERE prod_id = ?'
  const results =  await new Promise((resolve, reject) => {
  connection.query(produtoQuery,produto,(err, results) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(produto = results[0])
  })
})
  req.session.carrinho.push(produto)
  res.redirect('/carrinho?caminho = caminhoprod')
})
// app.get('/remove_item',(req , res ) =>{
//   const prod_id = req.query.prod_id;

// 	for(let i = 0; i < req.session.cart.length; i++)
// 	{
// 		if(request.session.cart[i].product_id === product_id)
// 		{
// 			request.session.cart.splice(i, 1);
// 		}
// 	}

// 	response.redirect("/");

// })
app.post('/redef', async (req, res) => {
    const usuario = req.session.usuario;
    const novoNome = req.body.nome;
 
    if (novoNome !== usuario.usu_nome) {
       const updateQuery = 'UPDATE usuario SET usu_nome = ? WHERE usu_id = ?';
       await new Promise((resolve, reject) => {
          connection.query(updateQuery, [novoNome, usuario.usu_id], (err, results) => {
             if (err) {
                reject(err);
                return;
             }
             resolve(results)
              req.session.usuario.usu_nome = novoNome;
             ;
          });
       });
    }
 
    res.redirect("/perfil");
 });
 

app.listen(3000, () => {
    console.log("Funcionando");
});
