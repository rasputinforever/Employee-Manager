// this grabs everything. Handy for many processes, but on its face, good for the 'Summarize Employee' pathway.
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "employeedb"
});

function getAllQuery() {
    // this allows ".then"
    return new Promise((resolve, reject) => {
        

        const queryText = 
        `SELECT
        e.id as id,
        CONCAT(e.first_name, ' ', e.last_name) as name,
        CONCAT(m.first_name, ' ', m.last_name) as manager,
        roles.title as title,
        roles.salary as salary,
        departments.dep_name as department
        FROM
        employees e
        LEFT JOIN employees m ON m.id = e.manager_id
        LEFT JOIN roles ON e.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
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
            console.log("Failed to retrieve Employee List")
        )  
        });
    });
}

module.exports = getAllQuery;