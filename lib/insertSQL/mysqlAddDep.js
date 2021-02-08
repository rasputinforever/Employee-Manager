// adds department to db

var mysql = require('mysql');

const connection = mysql.createConnection({
host: "127.0.0.1",
user: "root",
password: "password",
database: "employeedb"
});

function addDepartment(newDep) {
    
    
    return new Promise((resolve, reject) => {
        // grab everything as a PROMISE to be transformed later. We can pass this object around so we don't have to wait for all these "read" functions. 

        const queryText = 
        `INSERT INTO departments (dep_name)
        VALUES ("${newDep}")
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
            if (results) {
                console.log(`${newDep} successfully created and inserted into Departments!`)
                resolve(results)
            } else {
                console.log("Failed to insert department!")
            } 
        });
    });
}

module.exports = addDepartment;