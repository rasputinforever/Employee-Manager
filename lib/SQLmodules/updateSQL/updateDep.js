// updates (edits) employee 


function updateDepartment(depObj) {
    const sqlConnection = require('../connection.js')

    return new Promise((resolve, reject) => { 
       
        sqlConnection().then((connection) => {
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
        
    });
}

module.exports = updateDepartment;
