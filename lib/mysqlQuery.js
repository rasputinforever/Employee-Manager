// change of plan, this module will get ALL data pertinent to the tool. Use this to to all other READ fucntions.
var mysql = require('mysql');

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "employeedb"
});

function getAllQuery() {
    return new Promise((resolve, reject) => {
        // grab everything as a PROMISE to be transformed later. We can pass this object around so we don't have to wait for all these "read" functions. 

        const queryText = 
        `SELECT
        CONCAT(e.first_name, ' ', e.last_name) as name,
        CONCAT(m.first_name, ' ', m.last_name) as manager,
        roles.title as title,
        roles.salary as salary,
        departments.dep_name as department
        FROM
        employees e
        LEFT JOIN employees m ON m.id = e.manager_id
        RIGHT JOIN roles ON e.role_id = roles.id
        RIGHT JOIN departments ON roles.department_id = departments.id
        ORDER BY
        name;
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            resolve(results)
        } else (
            console.log("Failed to retrieve Department List")
        )  
        });
    });
}

module.exports = getAllQuery;
