// updates (edits) employee 


function updateTitle(titlObj) {
    const sqlConnection = require('../connection.js')

    return new Promise((resolve, reject) => { 
       
        sqlConnection().then((connection) => {
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
       
    });
}

module.exports = updateTitle;
