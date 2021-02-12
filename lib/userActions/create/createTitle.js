// npms
const inquirer = require('inquirer');

//QUERY adding
const {sqlInsert} = require('../../SQLmodules/mysqlActions.js')

//GET data
const getDepartments = require('../../SQLmodules/getSQL/mysqlQueryDep.js')

// create new Title
function createTitl() {    
    console.log("Coming Soon!")
    // titles require a department, so get a list of departments then PROMPT for the rest...
    getDepartments().then((depList) => {
        
        // create array of departments
        let departments = [];
        depList.forEach(dep => {
            departments.push(dep.department);
        });

        // inquire here: dep, salary, title
        inquirer.prompt([{
            name: 'title',
            type: 'input',
            message: 'What is the name of this new TITLE?'
        },{
            name: 'salary',
            type: 'input',
            message: 'What is the SALARY for this new title?'
        },{
            name: 'department',
            type: 'list',
            message: 'What DEPARTMENT will this title belong to?',
            choices: departments
        }]).then((res) => {
            // get depID
            const foundDep = depList.find(dep => dep.department === res.department);
            // send
            const titleInsert = `roles (title, salary, department_id)
            VALUES ("${res.title}", ${res.salary}, ${foundDep.id})`
            sqlInsert(titleInsert).then(() => {
                // cb query here
                const callbackQuery = require('../../globalFunctions/callbackQuery.js')
                callbackQuery();
            })
        })
    })
}

module.exports = createTitl;