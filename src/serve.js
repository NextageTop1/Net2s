const mysql = require('mysql2')
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password:'',
    database: 'drogauis',

})
connection.connect((err) => {
    if(err){
        console.error('Erro'+err.stack);

        return;
    }
    console.log('Conexao bem'+connection.threadld);
});
connection.query('SELECT * FROM aluno',(err,results,fields) => {
    if(err){console.error('Error consulta'+err.stack);
    return;
}
    console.log('Resultado:',results)
});
connection.end((err) =>{
    if(err){
        console.error('Erro ao encerrar'+err.stack)
    }
});