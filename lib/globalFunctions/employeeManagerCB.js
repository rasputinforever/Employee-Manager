//employee manager inquirer!
// new pseudocode for further improvements
// any missing features for assigned work?
    // BONUS: View employees by manager
    // Delete departments, roles, and employees (DONE)
        // possible to stick this into the EDITOR?
            // use the editing pathway, give an option to delete, send to DELETE SQL function
            // https://www.w3schools.com/sql/sql_delete.asp
// features that would be nice to have
    // a callback to the start of the script
    // an inquirer pre-amble that can deliver a "how-to", or at the very least, a welcome message. ASCII???
    // edit department
    // edit titles

// npms
const inquirer = require('inquirer');

// modules
// SUMMARIZE db elements by SELECT
const empSummary = require('../userActions/summarize/summarizeDataEmp.js')
const depSummary = require('../userActions/summarize/summarizeDataDep.js')
const titlSummary = require('../userActions/summarize/summarizeDataTitl.js')
// CREATE db elements by INSERT INTO
const createEmp = require('../userActions/create/createEmployee.js')
const createDep = require('../userActions/create/createDepartment.js')
const createTitl = require('../userActions/create/createTitle.js')
// EDIT db elements by UPDATE
const editEmp = require('../userActions/edit/editEmployeeGathers.js')
const editTitl = require('../userActions/edit/editTitleGathers.js')

// main menu, should be target of callback
function initEmpMan() {
    
    inquirer.prompt([{
        name: 'function',
        type: 'list',
        choices: ['Summary of Employees', 'Summary of Job Titles', 'Summary of Departments',
                    'Create new Employee', 'Create new Title', 'Create new Department',
                    'Edit Employee', 'Edit Title', 'Edit Department',
                    'Exit'],
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
                console.log("See you Next Time!")
                break;
        }
            
    })
}


// export this to all script endpoints
module.exports = initEmpMan;

// these will be spun into their own module(s)

// develop here
