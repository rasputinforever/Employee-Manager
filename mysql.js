// play with connections here. See if we can just get that data first, then work on exporting to an inquirer work-through. 
// look into console.table once we have our queries set up

var mysql = require('mysql');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "-",
  database: "employeedb"
});

// get a list of departments as an array, that will go into an inquirer. This setup works in the correct order using Pormise

function departmentListQuery(){
    function departmentQuery() {
        return new Promise((resolve, reject) => {
            const queryText = 
            `SELECT * FROM departments
            `
            connection.connect();
            connection.query(queryText, function (error, results, fields) {        
            if (error) throw error;
            if (results) {
                resolve(results)
            } else (
                console.log("Failed to retrieve Department List")
            )  
            });
        });
      }
    
    departmentQuery().then((data) => {    
        let depList = [];
        data.forEach(dep => {
            depList = [...depList, dep.dep_name];            
        });
        console.log(depList);
        connection.end();
        console.log("End of Task")
    });
}

departmentListQuery();