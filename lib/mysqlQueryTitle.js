// change of plan, this module will get ALL data pertinent to the tool. Use this to to all other READ fucntions.
var mysql = require('mysql');

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "employeedb"
});

function getTitles() {
    return new Promise((resolve, reject) => {
        // grab everything as a PROMISE to be transformed later. We can pass this object around so we don't have to wait for all these "read" functions. 

        const queryText = 
        `SELECT
        roles.title as title,
        roles.id as id
        FROM
        roles
        ORDER BY
        title;
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            resolve(results)
        } else (
            console.log("Failed to retrieve Titles List")
        )  
        });
    });
}

module.exports = getTitles;
