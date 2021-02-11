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
const updateTitle = require('../SQLmodules/updateSQL/updateTitle.js')
const callbackQuery = require('../globalFunctions/callbackQuery.js')

function editTitl() {
    // GET all TITLE stuff we need to update:
    
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
    // summarize
    console.table(`Summary for ${titlObj.title}`, 
    {
        Title: titlObj.title,
        Salary: titlObj.salary,
        Department: promptObj.deps[promptObj.depIDs.indexOf(titlObj.department_id)]
    })

    // this is our standard "do you want to continue" prompt we'll use to initiate callback or complete
    const contPrompt = {
        name: 'continue',
        type: 'confirm',
        message: 'Do you want to EDIT something else about this employee?'
    }

    // first ask WHAT element of employee to edit
    inquirer.prompt([{
        name: 'editChoice',
        type: 'list',
        message: 'Which employee element would you like to edit?',
        choices: ['Title Name', 'Salary', 'Department', 'Cancel', 'DELETE EMPLOYEE']
    }]).then((res) => {
        // switch for each thing, each wiil require an inquire
        switch(res.editChoice) {

            case 'Title Name':
                inquirer.prompt([{
                    name: 'name',
                    type: 'input',
                    message: 'What do you want the TITLE NAME to be:'
                },
                    contPrompt
                ]).then((res) => {
                    titlObj.title = res.name;

                    if (res.continue) {
                        updTitlLooper(titlObj, promptObj);
                    } else {
                        console.log(`Sent title to UPDATOR!`)
                        updateTitle(titlObj).then(() => {
                            // cb query here
                            callbackQuery();
                        });
                    }
                });

                break;
            case 'Salary':
                inquirer.prompt([{
                    name: 'salary',
                    type: 'input',
                    message: 'What do you want the SALARY to be:'
                },
                    contPrompt
                ]).then((res) => {

                });
                break;
            case 'Department':
                inquirer.prompt([{
                    name: 'department',
                    type: 'list',
                    message: 'What do you want the DEPARTMENT to be:',
                    choices: promptObj.deps
                },
                    contPrompt
                ]).then((res) => {

                });
                break;
            case 'Cancel':
                break;
            case 'DELETE TITLE':
                break;
            default:
                break;
                                                                                                                                                                
        }
    });
}
function editDep() {
    console.log("coming soon!")
    
}

// working below

