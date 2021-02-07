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

        CONCAT(employees.first_name, " ", employees.last_name) as "name", 
        roles.title as "title", 
        departments.dep_name as "department",
        employees.manager_id as "managerID"

        FROM employees

        RIGHT JOIN roles 
        ON employees.role_id = roles.id
        RIGHT JOIN departments 
        ON roles.department_id = departments.id

        ORDER BY employees.last_name ASC
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

modules.export = getAllQuery;