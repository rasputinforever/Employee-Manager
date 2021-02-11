// adds title to db

function addTitle(title, salary, depID) {
    
    const sqlConnection = require('../connection.js')

    return new Promise((resolve, reject) => {
        sqlConnection().then((connection) => {
            const queryText = 
            `INSERT INTO roles (title, salary, department_id)
            VALUES ("${title}", ${salary}, ${depID})
            `
            connection.connect();
            connection.query(queryText, function (error, results, fields) {        
            if (error) throw error;
            connection.end();
            if (results) {
                console.log(`${title} successfully created and inserted into Titles Database!`)
                resolve(results)
            } else (
                console.log("Failed to insert new Title!")
            )  
            });
        });
        
    });
}

module.exports = addTitle;