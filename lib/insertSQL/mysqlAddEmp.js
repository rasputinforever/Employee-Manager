// adds employee to db

var mysql = require('mysql');

const connection = mysql.createConnection({
host: "127.0.0.1",
user: "root",
password: "password",
database: "employeedb"
});

// whatever uses this needs to GET the IDs on its own time.
function addEmployee(fName, lName, depID, manID) {
    return new Promise((resolve, reject) => {
        // grab everything as a PROMISE to be transformed later. We can pass this object around so we don't have to wait for all these "read" functions. 
        
        const queryText = 
        `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES ("${fName}", "${lName}", ${depID}, ${manID})
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            console.log(`${fName} ${lName} successfully inserted into EmployeeDB!`)
            resolve(results)
        } else (
            console.log("Failed to create employee!")
        )  
        });
    });
}

module.exports = addEmployee;