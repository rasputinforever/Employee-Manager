// updates (edits) employee 


function updateTitle(titlObj) {
    const mysql = require('mysql');

    const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "password",
        database: "employeedb"
    });
    return new Promise((resolve, reject) => { 
       
        const queryText = 
        `UPDATE roles
        SET title = "${titlObj.fName}",
        salary = "${titlObj.lName}",
        department_id = ${titlObj.manID}
        WHERE id = ${titlObj.id}
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

module.exports = updateTitle;
