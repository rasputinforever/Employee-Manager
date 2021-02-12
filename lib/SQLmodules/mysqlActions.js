// adds department to db


const sqlConnection = require('./connection.js')

const sqlInsert = function(insert) {
    
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


// updates

const sqlUpdate = function(table, id) {

    const sqlConnection = require('./connection.js')

    return new Promise((resolve, reject) => { 
       
        sqlConnection().then((connection) => {
            const queryText = 
            `UPDATE ${table}
            WHERE id = ${id}
            `
            connection.connect();
            connection.query(queryText, function (error, results, fields) {        
            if (error) throw error;
            connection.end();
            if (results) {
                console.log("Database Updated!")
                resolve(results);
            } else (
                console.log("Failed to update!")
            )  
            });
        });
       
    });
}


// deletes Titles from DB

const sqlDelete = function(table, id) {
    
    const sqlConnection = require('./connection.js')

    return new Promise((resolve, reject) => {
        sqlConnection().then((connection) => {
                
            const queryText = 
            `
            DELETE FROM ${table} WHERE id = ${id}
            `

            connection.connect();
            connection.query(queryText, function (error, results, fields) {        
            if (error) throw error;
            
            connection.end();
            if (results) {
                console.log("Delete Successful!")
                resolve(results)
            } else (
                console.log("Failed to Delete!")
            )  
            });
        })
    });
}

module.exports = {sqlInsert, sqlUpdate, sqlDelete};