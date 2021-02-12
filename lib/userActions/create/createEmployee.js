// npms
const inquirer = require('inquirer');

//QUERY adding
const {sqlInsert} = require('../../SQLmodules/mysqlActions.js')

//GET data
const getAllQuery = require('../../SQLmodules/getSQL/mysqlQuery.js')
const getTitles = require('../../SQLmodules/getSQL/mysqlQueryTitle.js')


const callbackQuery = require('../../globalFunctions/callbackQuery.js')

// creates new employee
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
                // get roleID
                const foundTitle = titlList.find(title => title.title === res.title);
                // get manID
                const foundEmployee = empList.find(emp => emp.name === res.manager);
                const empInsert = `employees (first_name, last_name, role_id, manager_id)
                VALUES ("${res.fName}", "${res.lName}", ${foundTitle.id}, ${foundEmployee.id})`
                // send 
                sqlInsert(empInsert).then(() => {
                    // cb query here
                    callbackQuery();
                });
            })
        });
    });
}

module.exports = createEmp;