const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.IP,
  user: process.env.C9_USER,
  password: '',
  database: "dbpeluditos"
});

function sqlAdd(data){
    const properties = [];
    let values= "";
    
    for (const item in data) {
        properties.push(item);
        values += `"${data[item]}",`;
    }
    return `INSERT INTO Peluditos (${properties.join()}) VALUES (${values.slice(0, -1)})`;
}

function addAnimal (data) {
    return new Promise ((resolve, reject) => {
        connection.query(sqlAdd(data), function (error, results, fields) {
            error ? reject(error) : resolve (results);
        });
    });
}

module.exports = {addAnimal};
