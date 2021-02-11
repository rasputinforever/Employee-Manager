// Just grabs department ino


function getDepartments() {
    const sqlConnection = require('../connection.js')
    
    return new Promise((resolve, reject) => {
        sqlConnection().then((connection) => {
            
        const queryText = 
        `SELECT
        departments.dep_name as department,
        departments.id as id
        FROM
        departments
        ORDER BY
        department;
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            resolve(results)
        } else (
            console.log("Failed to retrieve Department List")
        )  
        });
        })
    });
}

module.exports = getDepartments;