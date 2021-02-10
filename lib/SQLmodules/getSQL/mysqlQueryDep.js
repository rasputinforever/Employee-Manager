// Just grabs department ino


function getDepartments() {
    const mysql = require('mysql');

    const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "employeedb"
    });
    return new Promise((resolve, reject) => {

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
    });
}

module.exports = getDepartments;