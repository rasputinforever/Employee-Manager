// employee manager
// I installed express... but I don't think we actually needed it.
// INQUIRER is the user interface.

// initiate code
    // mandatory tools:
        // add departments, roles, and employees
            // there's a table for each of these
        // look at departments, roles, and employees -- think about what would be a practical way to 'see' this info
        // update/edite employee roles

    // "extras" suggested to add if possible
        // edit who an employee's manager is
        // view all employees under a manager
        // delete any of the above
            // deleting a manager creates an odd situation where you need to re-assign each employee to a new manager
            // same with departments!
        // combined salaray for a single department
        
// first thing's first... create the db! Can't quite do much without working data.

// npms
const inquirer = require('inquirer');

const cTable = require('console.table');

// modules
const getAllQuery = require('./lib/mysqlQuery.js')

// starts here
function initEmpMan() {
    console.log("Welcome to Employee Manager!")
    inquirer.prompt([{
        name: 'function',
        type: 'list',
        choices: ['Employee Summaries', 'Summary of Job Titles', 'Department Summaries'],
        message: 'To begin, pelase select one of the following...'
    }]).then((res) => {
        // get the read info here. Used for ALL subsequent functions!
        switch(res.function) {
            case 'Employee Summaries':
                    
                empSummary(res)
                break;
            case 'Department Summaries':
                empSummary();
                break;
            default:
                console.log("coming soon!")
                break;
        }
            
    })
}

initEmpMan();

function empSummary() {
    getAllQuery().then((data) => {
        console.log("Employee Summary...")
        console.table(data);
    })
}

function empSummary() {
    getAllQuery().then((data) => {
        // get a list of distinct deps using the same query
        let depList = [];
        let dupeCheck;
        data.forEach(employee => {
            dupeCheck = depList.indexOf(employee.department) === -1;            
            if (dupeCheck) {
                depList = [...depList, employee.department];
            }
        });

        // inquire about them
        inquirer.prompt({
            name: 'department',
            type: 'list',
            choices: depList,
            message: 'Which department would you like a summary of?'
        }).then((res) => {
            console.log('Summary for ', res.department)
            // ok now do a summary! haha!
            let depObj = {
                name: res.department,
                managers: [],
                employees: [],
                totalSalary: 0.00
            }
            
            data.forEach(employee => {
                if (employee.department === depObj.name) {
                    depObj.employees = [...depObj.employees, employee.name];
                    depObj.totalSalary += employee.salary; 
                    // manager check
                    if (employee.title.includes('Manager')) {
                        depObj.managers = [...depObj.managers, employee.name];
                    }
                }
            });
            depObj.totalSalary = `$${depObj.totalSalary}`
            // display final table of info
            console.table(depObj);
        })
    })
}
