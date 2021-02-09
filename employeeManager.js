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
const editEmp = require('./lib/userActions/edit/editEmployee.js')


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

const getAllQuery = require('./lib/SQLmodules/getSQL/mysqlQuery.js')
const getAllTitle = require('./lib/SQLmodules/getSQL/mysqlQueryTitle.js')
const updateEmployee = require('./lib/SQLmodules/updateSQL/updateEmployee.js')
function editEmp() {
    console.log("coming soon!")
    // first, guery up employees
    // second, inquire as to which employee to edit
    // third, re-inquire each of the editable elements
    // last, send updates by way of SQL UPDATE!
    
    // this can be well replicated for each table
    getAllQuery().then((empList) => {
        // all employees and managers
        let employees = [];
        let managers = [];
        empList.forEach(employee => {
            employees.push(employee.name);
            if (employee.title.includes('Manager')) {
                managers.push(employee.name);
            } 
        });

        // get list of roles
        getAllTitle().then((titlList) => {

            // inquire as to which employee
            inquirer.prompt([{
                name: 'employee',
                type: 'list',
                message: 'Which EMPLOYEE wil be edited?',
                choices: employees
            }]).then((res) => {
                // get full employee obj to fill into object that will be used for UPDATE
                const foundEmployee = empList.find(emp => emp.name === res.employee);

                // managers array used in later prompts
                let managers = [];
                let managerIDs = [];
                empList.forEach(employee => {
                    if (employee.title.includes('Manager')) {
                        managers.push(employee.name);
                        managerIDs.push(employee.id);
                    } 
                });

                // get list of titles for prompt purposes
                let titles = [];
                let titleIDs = [];
                titlList.forEach(title => {
                    titles.push(title.title);
                    titleIDs.push(title.id);
                });

                // stuff used for prompting later
                const promptObjSources = {
                    titles: titles,
                    titleIDs: titleIDs,
                    managers: managers,
                    managerIDs: managerIDs
                }

                // employee obj that contains all required inputs for UPDATE
                let newEmpObj = {
                    id: foundEmployee.id,
                    fName: foundEmployee.name.split(' ')[0],
                    lName: foundEmployee.name.split(' ')[1],
                    manID: (empList.find(emp => emp.name === foundEmployee.manager)).id,
                    roleID: (titlList.find(titl => titl.title === foundEmployee.title)).id
                }
               updEmpLooper(newEmpObj, promptObjSources);
            })
        })
    });
}

function updEmpLooper(empObj, promptObj) {
    // handly table for review
    console.table(`Current Elements for Employee:`, 
        {
            first_name: empObj.fName, 
            last_name: empObj.lName, 
            manager: promptObj.managers[empObj.manID - 1], 
            title: promptObj.titles[empObj.roleID - 1]
        }
    )

    // this is our standard "do you want to continue" prompt we'll use to initiate callback or complete
    const contPrompt = {
        name: 'continue',
        type: 'confirm',
        message: 'Do you want to EDIT something else about this employee?'
    }

    // first ask WHAT to edit
    inquirer.prompt([{
        name: 'editChoice',
        type: 'list',
        message: 'Which employee element would you like to edit?',
        choices: ['First Name', 'Last Name', 'Manager', 'Title', 'Exit']
    }]).then((res) => {
        // switch for each thing, each wiil require an inquire
        switch(res.editChoice) {
            case 'First Name':
                // first and last name just require an INPUT
                inquirer.prompt([{
                    name: 'fName',
                    type: 'input',
                    message: 'What do you want the FIRST NAME to be:'
                },contPrompt]).then((res) => {
                    empObj.fName = res.fName;
                    if (res.continue) {
                        updEmpLooper(empObj, promptObj);
                    } else {
                        console.log(`Sent employee UPDATOR!`)
                        updateEmployee(empObj);
                    }
                })
                break;

            case 'Last Name':
                inquirer.prompt([{
                    name: 'lName',
                    type: 'input',
                    message: 'What do you want the LAST NAME to be:'
                },contPrompt]).then((res) => {
                    empObj.lName = res.lName
                    if (res.continue) {
                        updEmpLooper(empObj, promptObj);
                    } else {
                        console.log("Sent to UPDATE!");
                        updateEmployee(empObj);
                    }
                })
                break;

            case 'Manager':
                // manager
                inquirer.prompt([{
                    name: 'manager',
                    type: 'list',
                    message: 'Which MANAGER should be assigned to this employee:',
                    choices: promptObj.managers
                },contPrompt]).then((res) => {
                    empObj.manID = promptObj.managers.indexOf(res.manager) + 1;
                    if (res.continue) {
                        updEmpLooper(empObj, promptObj);
                    } else {
                        console.log("Sent to UPDATE!");
                        updateEmployee(empObj);
                    }
                })
                break;
            case 'Title':
                // title
                inquirer.prompt([{
                    name: 'title',
                    type: 'list',
                    message: 'Which TITLE should be assigned to this employee:',
                    choices: promptObj.titles
                },contPrompt]).then((res) => {
                    empObj.roleID = promptObj.titles.indexOf(res.title) + 1;
                    if (res.continue) {
                        updEmpLooper(empObj, promptObj);
                    } else {
                        console.log("Sent to UPDATE!");
                        updateEmployee(empObj);
                    }
                })
                break;
            default:
                console.log("Process Ended.")
                break;
        }
    })
}


function editTitl() {
    console.log("coming soon!")
    
}
function editDep() {
    console.log("coming soon!")
    
}

// working below

