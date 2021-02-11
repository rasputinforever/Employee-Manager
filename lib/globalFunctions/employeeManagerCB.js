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

// required functions
const getTitles = require('../SQLmodules/getSQL/mysqlQueryTitle.js')
const getDepartments = require('../SQLmodules/getSQL/mysqlQueryDep.js')


function editTitl() {
    // GET all TITLE stuff we need to update:
    const titlObj = {
        id: '',
        title: '',
        salary: '',
        dep: ''
    }
    // getTitles
    getTitles().then((titlList) => {
        getDepartments().then((depList) => {
            // build arr of titles
            let titles = [];
            let titleIDs = [];
            titlList.forEach(title => {
                titles.push(title.title);
                titleIDs.push(title.id);
            });

            let deps = [];
            let depIDs = [];
            depList.forEach(dep => {
                deps.push(dep.department);
                depIDs.push(dep.id);
            });

            const promptObj = {
                titles: titles,
                titleIDs: titleIDs,
                deps: deps,
                depIDs: depIDs
            };
            // ask which title we want to edit, then goto editor CB looper
            inquirer.prompt({
                name: 'selection',
                type: 'list',
                message: 'Which TITLE should be edited?',
                choices: promptObj.titles
            }).then((res) => {
                const selectedTitle = titlList.find(title => title.title === res.selection);
                updTitlLooper(selectedTitle, promptObj);
            })
        })
    })
}

function updTitlLooper(titlObj, promptObj) {
    

    console.log(promptObj);
    console.log(titlObj);
};

function editDep() {
    console.log("coming soon!")
    
}

// working below

