// deletes Titles from DB

function deleteDep(depID) {
    
    const sqlConnection = require('../connection.js')

    return new Promise((resolve, reject) => {
        sqlConnection().then((connection) => {
                
            const queryText = 
            `
            DELETE FROM departments WHERE id = ${depID}
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

module.exports = deleteDep;