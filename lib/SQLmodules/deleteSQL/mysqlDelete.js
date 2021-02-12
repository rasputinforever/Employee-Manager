// deletes Titles from DB

function sqlDelete(table, id) {
    
    const sqlConnection = require('../connection.js')

    return new Promise((resolve, reject) => {
        sqlConnection().then((connection) => {
                
            const queryText = 
            `
            DELETE FROM ${table} WHERE id = ${id}
            `

            connection.connect();
            connection.query(queryText, function (error, results, fields) {        
            if (error) throw error;
            connection.end();
            if (results) {
                console.log("Department Deleted!")
                resolve(results)
            } else (
                console.log("Failed to delete Department!")
            )  
            });
        })
    });
}

module.exports = sqlDelete;