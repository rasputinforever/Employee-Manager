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
            case 'Summary of Job Titles':
                titleSUmmary();
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

        // inquire which summary we need
        inquirer.prompt({
            name: 'department',
            type: 'list',
            choices: depList,
            message: 'Which department would you like a summary of?'
        }).then((res) => {
            console.log('Summary for ', res.department)
            // ok now do a summary! haha! Re-organize desired data into an object which will be displayed
            let depObj = {
                Department: res.department,
                Managers: [],
                Employees: [],
                Total_Salary: 0.00
            }

            data.forEach(employee => {
                if (employee.department === depObj.Department) {
                    depObj.Employees = [...depObj.Employees, employee.name];
                    depObj.Total_Salary += employee.salary; 
                    // manager check
                    if (employee.title.includes('Manager')) {
                        depObj.Managers.push(employee.name);
                    } 
                } 
            });

            depObj.Total_Salary = `$${depObj.Total_Salary}`
            // display final table of info
            console.table(depObj);
        })
    })
}

function titleSUmmary() {
    getAllQuery().then((data) => {
        // get a list of distinct deps using the same query
        let titleList = [];
        let dupeCheck;
        data.forEach(employee => {
            dupeCheck = titleList.indexOf(employee.title) === -1;            
            if (dupeCheck) {
                titleList = [...titleList, employee.title];
            }
        });

        // inquire which summary we need
        inquirer.prompt({
            name: 'title',
            type: 'list',
            choices: titleList,
            message: 'Which title would you like a summary of?'
        }).then((res) => {
            console.log('Summary for ', res.title)
            // ok now do a summary! haha! Re-organize desired data into an object which will be displayed
            let titlObj = {
                Title: res.title,
                Employees: [],
                Managers: [],
                Salary: 0.00
            }
            // get a list of all employees currently with that title
            data.forEach(employee => {
                if (employee.title === titlObj.Title) {
                    titlObj.Employees = [...titlObj.Employees, employee.name];
                    titlObj.Salary = employee.salary; 
                } 
            });
            // get manager(s)

            // get salary(s)
            
            titlObj.Salary = `$${titlObj.Salary}`
            // display final table of info
            console.table(titlObj);
        })
    })
}

