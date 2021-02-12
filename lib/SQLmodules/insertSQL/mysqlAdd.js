// adds department to db

function sqlInsert(insert) {
    
    const sqlConnection = require('../connection.js')

    return new Promise((resolve, reject) => {
        sqlConnection().then((connection) => {
            const queryText = 
            `INSERT INTO ${insert}
            `
            connection.connect();
            connection.query(queryText, function (error, results, fields) {        
            if (error) throw error;
            connection.end();
                if (results) {
                    console.log(`INSERT Successful!`)
                    resolve(results)
                } else {
                    console.log("Failed to INSERT!")
                } 
            });
        });
        
    });
}

module.exports = sqlInsert;