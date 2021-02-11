// deletes Departments from DB

function deleteDep(depID) {
    // this allows ".then"
    const mysql = require('mysql');

    const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "employeedb"
    });

    return new Promise((resolve, reject) => {
        
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
    });
}

module.exports = deleteDep;