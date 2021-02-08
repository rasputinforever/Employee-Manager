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
// CREATE db elements
const createEmp = require('./lib/create/createEmployee.js')
const createDep = require('./lib/create/createDepartment.js')
const createTitl = require('./lib/create/createTitle.js')

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

