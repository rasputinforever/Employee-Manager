// adds employee to db


function addEmployee(fName, lName, roleID, manID) {
    const mysql = require('mysql');

    const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "employeedb"
    });
    return new Promise((resolve, reject) => {

        const queryText = 
        `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES ("${fName}", "${lName}", ${roleID}, ${manID})
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            console.log(`${fName} ${lName} successfully inserted into Employees Database!`)
            resolve(results)
        } else (
            console.log("Failed to create Employee!")
        )  
        });
    });
}

module.exports = addEmployee;