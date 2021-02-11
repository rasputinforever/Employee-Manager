// deletes Titles from DB

function deleteTitl(titlID) {
    const sqlConnection = require('../connection.js')

    return new Promise((resolve, reject) => {
        sqlConnection().then((connection) => {
            
        const queryText = 
        `
        DELETE FROM roles WHERE id = ${titlID}
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            console.log("Title Deleted!")
            resolve(results)
        } else (
            console.log("Failed to delete Title!")
        )  
        });
        })
    });
}

module.exports = deleteTitl;