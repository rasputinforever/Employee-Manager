// employee manager
// I installed express... but I don't think we actually needed it.
// INQUIRER is the user interface.

// initiate code
    // mandatory tools:
        // add departments, roles, and employees
            // there's a table for each of these
                //WISHLIST: check for duplicates... 
        // look at departments, roles, and employees -- think about what would be a practical way to 'see' this info: DONE
                // check on all these. Might improve later.
        // update/edite employee roles

    // "extras" suggested to add if possible
        // edit who an employee's manager is
        // view all employees under a manager
        // delete any of the above
            // deleting a manager creates an odd situation where you need to re-assign each employee to a new manager
            // same with departments!
        // combined salaray for a single department: DONE
        
// first thing's first... create the db! Can't quite do much without working data.: DONE

// npms
const inquirer = require('inquirer');

// modules
// QUERY reading
const empSummary = require('./lib/summary/summarizeDataEmp.js')
const depSummary = require('./lib/summary/summarizeDataDep.js')
const titlSummary = require('./lib/summary/summarizeDataTitl.js')
//QUERY adding
const addDepartment = require('./lib/insertSQL/mysqlAddDep.js')
const addEmployee = require('./lib/insertSQL/mysqlAddEmp.js')
const addTitle = require('./lib/insertSQL/mysqlAddTitle.js')
//GET data
const getAllQuery = require('./lib/mysqlQuery.js')
const getDepartments = require('./lib/mysqlQueryDep.js')
const getTitles = require('./lib/mysqlQueryTitle.js')


// starts here
function initEmpMan() {
    console.log("Welcome to Employee Manager!")
    inquirer.prompt([{
        name: 'function',
        type: 'list',
        choices: ['Employee Summaries', 'Summary of Job Titles', 'Department Summaries',
                    'Create new Employee', 'Create new Title', 'Create new Department'],
        message: 'To begin, pelase select one of the following...'
    }]).then((res) => {
        // get the read info here. Used for ALL subsequent functions!
        switch(res.function) {
            case 'Employee Summaries':        
                empSummary()
                break;
            case 'Department Summaries':
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
            default:
                console.log("coming soon!")
                break;
        }
            
    })
}

// start!
initEmpMan();

// these will be spun into their own module(s)

function createEmp() {
    console.log("Initiating CREATE EMPLOYEE...")
    getAllQuery().then((empList) => {
        
        getTitles().then((titlList) => {

            // all managers
            let managers = [];
            empList.forEach(employee => {
                if (employee.title.includes('Manager')) {
                    managers.push(employee.name);
                } 
            });

            // all titles
            let titles = [];
            titlList.forEach(title => {
                titles.push(title.title);
            });

            // inquire, then send back IDs for these two arrays above
            inquirer.prompt([{
                name: 'fName',
                type: 'input',
                message: `What is this employee's FIRST NAME?`
            },{
                name: 'lName',
                type: 'input',
                message: `What is this employee's LAST NAME?`
            },{
                name: 'title',
                type: 'list',
                message: `What is this employee's TITLE?`,
                choices: titles
            },{
                name: 'manager',
                type: 'list',
                message: `What is this employee's MANAGER?`,
                choices: managers
            }]).then((res) => {
                // get depID
                const foundTitle = titlList.find(title => title.title === res.title);
                // get manID
                const foundEmployee = empList.find(emp => emp.name === res.manager);
                // send 
                addEmployee(res.fName, res.lName, foundTitle.department_id, foundEmployee.id);
            })
        });
    });

}
function createTitl() {    
    console.log("Coming Soon!")
}

// works
function createDep() {
    inquirer.prompt({
        message: 'What will this Department be called?',
        type: 'input',
        name: 'newDep'
    }).then((res) => {
        addDepartment(res.newDep);
    })
}
