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
