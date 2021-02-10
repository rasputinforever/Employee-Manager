// employee manager
// INQUIRER is the user interface.
// mysql is the db
// async interactions is the name of the game

// initiate code

    // "extras" suggested to add if possible
        // view all employees under a manager
        // delete any of the above
            // deleting a manager creates an odd situation where you need to re-assign each employee to a new manager
            // same with departments!
                // sounds like HELL. don't do this, that's annoying!

// npms
const inquirer = require('inquirer');

// modules
// SUMMARIZE db elements by SELECT
const empSummary = require('./lib/userActions/summarize/summarizeDataEmp.js')
const depSummary = require('./lib/userActions/summarize/summarizeDataDep.js')
const titlSummary = require('./lib/userActions/summarize/summarizeDataTitl.js')
// CREATE db elements by INSERT INTO
const createEmp = require('./lib/userActions/create/createEmployee.js')
const createDep = require('./lib/userActions/create/createDepartment.js')
const createTitl = require('./lib/userActions/create/createTitle.js')
// EDIT db elements by UPDATE
const editEmp = require('./lib/userActions/edit/editEmployeeGathers.js')


// starts here
function initEmpMan() {
    console.log("Welcome to Employee Manager!")
    inquirer.prompt([{
        name: 'function',
        type: 'list',
        choices: ['Summary of Employees', 'Summary of Job Titles', 'Summary of Departments',
                    'Create new Employee', 'Create new Title', 'Create new Department',
                    'Edit Employee', 'Edit Title', 'Edit Department'],
        message: 'To begin, pelase select one of the following...'
    }]).then((res) => {
        // get the read info here. Used for ALL subsequent functions!
        switch(res.function) {
            case 'Summary of Employees':        
                empSummary()
                break;
            case 'Summary of Departments':
                depSummary();
                break;
            case 'Summary of Job Titles':
                titlSummary();
                break;
            case 'Create new Employee':
                createEmp();
                break;                
            case 'Create new Title':
                createTitl();
                break;              
            case 'Create new Department':
                createDep();
                break;                
            case 'Edit Employee':
                editEmp();
                break;                
            case 'Edit Title':
                editTitl();
                break;                
            case 'Edit Department':
                editDep();
                break;
            default:
                console.log("coming soon!")
                break;
        }
            
    })
}

// start!
initEmpMan();

// these will be spun into their own module(s)

// develop here

// required functions

function editTitl() {
    console.log("coming soon!")
    
}
function editDep() {
    console.log("coming soon!")
    
}

// working below

