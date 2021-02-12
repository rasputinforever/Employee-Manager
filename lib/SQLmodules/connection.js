const mysql = require('mysql');

function sqlConnection() {
        // this allows ".then"
        return new Promise((resolve, reject) => {

            const connection = mysql.createConnection({
                host: "127.0.0.1",
                user: "root",
                password: "ZoilaNoelle2020!&",
                database: "employeedb"
            });

            resolve(connection);
    });
}

module.exports = sqlConnection;