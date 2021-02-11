// deletes employees from DB

function deleteEmp(empID) {
    const sqlConnection = require('../connection.js')

    return new Promise((resolve, reject) => {
        sqlConnection().then((connection) => {
            
        const queryText = 
        `
        DELETE FROM employees WHERE id = ${empID}
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            console.log("Employee Deleted!")
            resolve(results)
        } else (
            console.log("Failed to delete Employee!")
        )  
        });
        })
    });
}

module.exports = deleteEmp;