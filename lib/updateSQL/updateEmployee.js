// change of plan, this module will get ALL data pertinent to the tool. Use this to to all other READ fucntions.
var mysql = require('mysql');

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "employeedb"
});

function updateEmployee(id, fName, lName, manID, roleID) {
    return new Promise((resolve, reject) => {
        // grab everything as a PROMISE to be transformed later. We can pass this object around so we don't have to wait for all these "read" functions. 

        const queryText = 
        `UPDATE employees
        SET first_name = ${fName}
        SET last_name = ${lName}
        SET manager_id = ${manID}
        SET role_id = ${roleID}
        WHERE id = ${id};
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            resolve(results)
        } else (
            console.log("Failed to update employee!")
        )  
        });
    });
}

module.exports = updateEmployee;
