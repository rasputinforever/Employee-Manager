// npms
const inquirer = require('inquirer');

//QUERY adding
const addTitle = require('../insertSQL/mysqlAddTitle.js')
//GET data
const getDepartments = require('../getSQL/mysqlQueryDep.js')

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
            addTitle(res.title, res.salary, foundDep.id)
        })
    })
}

module.exports = createTitl;