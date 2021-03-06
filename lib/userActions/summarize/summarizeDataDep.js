
// npms
const inquirer = require('inquirer');

// modules
const getAllQuery = require('../../SQLmodules/getSQL/mysqlQuery.js')

// sumamrizes all info about a department
function depSummary() {
    getAllQuery().then((data) => {
        // get a list of distinct deps using the same query
        let depList = [];
        let dupeCheck;
        data.forEach(employee => {
            dupeCheck = depList.indexOf(employee.department) === -1;            
            if (dupeCheck && employee.department != null) {
                depList = [...depList, employee.department];
            }
        });
        console.log(depList)
        // inquire which summary we need
        inquirer.prompt({
            name: 'department',
            type: 'list',
            message: 'Which department would you like a summary of?',
            choices: depList
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
        }).then(() => {
            // cb query here
            const callbackQuery = require('../../globalFunctions/callbackQuery.js')
            callbackQuery();
        })
    })
}

module.exports = depSummary;