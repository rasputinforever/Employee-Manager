// adds title to db
const mysql = require('mysql');

const connection = mysql.createConnection({
host: "127.0.0.1",
user: "root",
password: "password",
database: "employeedb"
});

function addTitle(title, salary, depID) {
    return new Promise((resolve, reject) => {

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
}

module.exports = addTitle;