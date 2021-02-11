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
        SET title = "${titlObj.title}",
        salary = "${titlObj.salary}",
        department_id = ${titlObj.department_id}
        WHERE id = ${titlObj.id}
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            console.log("Title Updated!")
            resolve(results);
        } else (
            console.log("Failed to update/edit Employee!")
        )  
        });
    });
}

module.exports = updateTitle;
