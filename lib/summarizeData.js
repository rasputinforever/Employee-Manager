
// npms
const inquirer = require('inquirer');
const cTable = require('console.table');

// modules
const getAllQuery = require('./mysqlQuery.js')

// summarizes all employees. Conveniently, the query is just that.
function empSummary() {
    getAllQuery().then((data) => {
        console.table(`Summary of Employees`, data);
    })
}

// sumamrizes all info about a department
function depSummary() {
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
            console.table(`Summary of ${depObj.Department}`, depObj);
        })
    })
}

// summarizes a specific title and includes a list of all persons with that title...
function titlSummary() {
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
            // ok now do a summary! haha! Re-organize desired data into an object which will be displayed
            let titlObj = {
                Title: res.title,
                Employees: [],
                Department: '',
                Manager: '',
                Salary: 0.00
            }
            // get a list of all employees currently with that title.
            // the assumption made here is that the salary for each person with that title is the same.
            data.forEach(employee => {
                if (employee.title === titlObj.Title) {
                    titlObj.Employees = [...titlObj.Employees, employee.name];
                    titlObj.Salary = employee.salary; 
                    titlObj.Department = employee.department;
                    titlObj.Manager = employee.manager;
                    // manager check, show "n/a" if this title IS manager!
                    if (employee.title.includes('Manager')) {
                        titlObj.Manager = 'N/A';
                    } 
                    
                    
                } 
            });
            // get manager(s)

            
            titlObj.Salary = `$${titlObj.Salary}`
            // display final table of info
            console.table(`Summary of ${titlObj.Title}`, titlObj);
        })
    })
}

module.exports = empSummary;
module.exports = depSummary;
module.exports = titlSummary;