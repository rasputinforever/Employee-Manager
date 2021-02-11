// this grabs everything. Handy for many processes, but on its face, good for the 'Summarize Employee' pathway.

function getAllQuery() {

    
    const sqlConnection = require('../connection.js')

    return new Promise((resolve, reject) => {
        sqlConnection().then((connection) => {
            
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
        })
    });
}

module.exports = getAllQuery;