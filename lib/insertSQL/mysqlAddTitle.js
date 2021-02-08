// adds title to db

// get that ID somehow...
function addTitle(title, salary, depID) {
    return new Promise((resolve, reject) => {
        // grab everything as a PROMISE to be transformed later. We can pass this object around so we don't have to wait for all these "read" functions. 

        const queryText = 
        `INSERT INTO roles (title, salary, department_id)
        VALUES ("${title}", ${salary}, ${depID})
        `
        connection.connect();
        connection.query(queryText, function (error, results, fields) {        
        if (error) throw error;
        connection.end();
        if (results) {
            console.log(`${title} successfully created and inserted into TitlesDB!`)
            resolve(results)
        } else (
            console.log("Failed to insert new title!")
        )  
        });
    });
}

module.exports = addTitle;