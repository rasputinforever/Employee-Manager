
// npms
const inquirer = require('inquirer');
const cTable = require('console.table');

// modules
const getAllQuery = require('../mysqlQuery.js')

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

module.exports = titlSummary;