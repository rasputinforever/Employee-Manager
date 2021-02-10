// updates (edits) employee 
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "employeedb"
});

function updateEmployee(empObj) {
    return new Promise((resolve, reject) => { 
       
        const queryText = 
        `UPDATE employees
        SET first_name = "${empObj.fName}",
        last_name = "${empObj.lName}",
        manager_id = ${empObj.manID},
        role_id = ${empObj.roleID}
        WHERE id = ${empObj.id}
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            resolve(results);
        } else (
            console.log("Failed to update/edit Employee!")
        )  
        });
    });
}

module.exports = updateEmployee;
