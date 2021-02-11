// adds department to db

function addDepartment(newDep) {
    
    const sqlConnection = require('../connection.js')

    return new Promise((resolve, reject) => {
        sqlConnection().then((connection) => {
            const queryText = 
            `INSERT INTO departments (dep_name)
            VALUES ("${newDep}")
            `
            connection.connect();
            connection.query(queryText, function (error, results, fields) {        
            if (error) throw error;
            connection.end();
                if (results) {
                    console.log(`${newDep} successfully created and inserted into Departments Database!`)
                    resolve(results)
                } else {
                    console.log("Failed to insert Department!")
                } 
            });
        });
        
    });
}

module.exports = addDepartment;