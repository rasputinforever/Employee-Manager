// updates (edits) employee 


function updateDepartment(depObj) {
    const mysql = require('mysql');

    const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "password",
        database: "employeedb"
    });
    return new Promise((resolve, reject) => { 
       
        const queryText = 
        `UPDATE departments
        SET dep_name = "${depObj.department}"
        WHERE id = ${depObj.id}
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            console.log("Department Updated!")
            resolve(results);
        } else (
            console.log("Failed to update/edit Department!")
        )  
        });
    });
}

module.exports = updateDepartment;
