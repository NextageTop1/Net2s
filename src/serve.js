
const mysql = require('mysql2');
const Sequelize = require('sequelize')
const sequelize = new Sequelize('net2s', 'root', '',{
    host: "localhost",
    dialect: 'mysql'
})

//criando tabela com sequelize
/* const Postagem = sequelize.define('testando',{
    teste1:{
        type: Sequelize.STRING
    },
    teste2:{
        type:Sequelize.TEXT
    }
});

Postagem.sync() */

/* const Cliente = sequelize.define('clientes', {
    nome:{
        type: Sequelize.STRING
    },
    telefone:{
        type: Sequelize.INTEGER
    },
    email:{
        type:Sequelize.TEXT
    },
    cpf:{
        type:Sequelize.INTEGER
    }
});
//inserindo dados nas taelas
Cliente.create({
    nome:"vitor",
    telefone:123456,
    email:"email@exemple",
    cpf:123333
})
Cliente.sync(); */

sequelize.authenticate().then(() => {
    console.log("conectado com sucesso")
}).catch((erro) => {
    console.log("Erro ao se conectar: "+ erro)
})




/* const connection = mysql.createConnection({
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
}); */
/* const usu = {
    nome: 'victor',
    telefone: 12345677,
    senha:'werwr ',
    email: 'exemple@email',
    permissao: 1,
    endCobranca: 'rwerw ',
    endEntrega: ' rwerwer'
}
const query = 'INSERT INTO usuario ( `usu_nome`, `telefone`, `senha`, `usu_email`, `usu_permissao`, `usu_end_cobranca`, `usu_end_entrega`) VALUES (?,?,?,?,?,?,?)'
connection.query(query,[usu.nome,usu.telefone,usu.senha,usu.email,usu.permissao,usu.endCobranca,usu.endEntrega],(err, results)=> {
    if (err) {
        console.error('Erro ao fechar a conexão:', err);
        return;
}}) */

/* connection.query('SELECT * FROM usuario',(err,results,fields) => {
    if(err){console.error('Error consulta'+err.stack);
    return;
}
    console.log('Resultado:',results)
});

connection.end((err) =>{
    if(err){
        console.error('Erro ao encerrar'+err.stack)
    }
}); */

//module.exports = {connection}