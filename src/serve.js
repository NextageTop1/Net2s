

const mysql = require('mysql2');
const { Connection } = require('mysql2/typings/mysql/lib/Connection');
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
connection.query('SELECT * FROM usuario',(err,results,fields) => {
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