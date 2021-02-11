// updates (edits) employee 


function updateEmployee(empObj) {
    const sqlConnection = require('../connection.js')

    return new Promise((resolve, reject) => { 
       
        sqlConnection().then((connection) => {
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
        
    });
}

module.exports = updateEmployee;
