// adds employee to db


function addEmployee(fName, lName, roleID, manID) {
    
    const sqlConnection = require('../connection.js')
    return new Promise((resolve, reject) => {
        sqlConnection().then((connection) => {
            const queryText = 
            `INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES ("${fName}", "${lName}", ${roleID}, ${manID})
            `
            connection.connect();
            connection.query(queryText, function (error, results, fields) {        
            if (error) throw error;
            connection.end();
            if (results) {
                console.log(`${fName} ${lName} successfully inserted into Employees Database!`)
                resolve(results)
            } else (
                console.log("Failed to create Employee!")
            )  
            });  
        })
        
    });
}

module.exports = addEmployee;