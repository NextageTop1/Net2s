
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

module.exports = {connection}