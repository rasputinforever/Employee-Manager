//employee manager inquirer!
// TO-DO/WISHLIST
    // consolidate SQL queries in some way... or at the very least, consolidate the "connection" to a single file
    // there's PLENTY that could be conslidated within the various editing pathways

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
const editDep = require('../userActions/edit/editDepartmentGathers.js')

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