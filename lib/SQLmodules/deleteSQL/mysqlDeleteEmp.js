// this grabs everything. Handy for many processes, but on its face, good for the 'Summarize Employee' pathway.

function deleteEmp(empID) {
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
    });
}

module.exports = deleteEmp;