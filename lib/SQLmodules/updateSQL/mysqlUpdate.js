// updates

function sqlUpdate(table, id) {

    const sqlConnection = require('../connection.js')

    return new Promise((resolve, reject) => { 
       
        sqlConnection().then((connection) => {
            const queryText = 
            `UPDATE ${table}
            WHERE id = ${id}
            `
            connection.connect();
            connection.query(queryText, function (error, results, fields) {        
            if (error) throw error;
            connection.end();
            if (results) {
                console.log("Database Updated!")
                resolve(results);
            } else (
                console.log("Failed to update!")
            )  
            });
        });
       
    });
}

module.exports = sqlUpdate;
