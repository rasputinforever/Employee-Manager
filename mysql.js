// play with connections here. See if we can just get that data first, then work on exporting to an inquirer work-through. 
// look into console.table once we have our queries set up

var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "*",
  database: "employeedb"
});

conn.connect((err)=>{
  if (err) throw err;
  
  conn.query("SELECT * FROM departments", (err, result, fields)=>{
    if (err) throw err;
    console.log(result);
  });
});

console.log("test")