// this function requires a LOT of info, a LOT of querying, and re-configuring that data given the inputs. This could be broken down further, refractored.

// npms
const inquirer = require('inquirer');
//GET database
const getAllQuery = require('../../SQLmodules/getSQL/mysqlQuery');
const getAllTitle = require('../../SQLmodules/getSQL/mysqlQueryTitle.js');

// our EDITOR/callback where we will SEND our data
const updEmpLooper = require('./editEmployeeEditor.js')

// GATHER then SUMMARIZE then SEND to the ACTION function
function editEmp() {    
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
                // DATA gathering and summarization starts here, then send all in two nice objects for editing references
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
                // ACTION function!
                updEmpLooper(newEmpObj, promptObjSources);
            })
        })
    });
}

module.exports = editEmp;