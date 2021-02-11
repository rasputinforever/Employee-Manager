// grabs all Titles/Roles from db


function getTitles() {
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
        roles.title as title,
        roles.id as id,
        roles.salary as salary,
        roles.department_id as department_id
        FROM
        roles
        ORDER BY
        title;
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            resolve(results)
        } else (
            console.log("Failed to retrieve Titles List")
        )  
        });
    });
}

module.exports = getTitles;