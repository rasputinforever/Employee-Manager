// deletes Titles from DB

function deleteTitl(titlID) {
    // this allows ".then"
    const mysql = require('mysql');

    const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "employeedb"
    });

    return new Promise((resolve, reject) => {
        
        const queryText = 
        `
        DELETE FROM roles WHERE id = ${titlID}
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            console.log("Title Deleted!")
            resolve(results)
        } else (
            console.log("Failed to delete Title!")
        )  
        });
    });
}

module.exports = deleteTitl;