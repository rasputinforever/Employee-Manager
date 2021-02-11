// this is the ACTION inquirer, callback-looper, gets its data from "editEmpEditor.js"

// npms
const inquirer = require('inquirer');
// UPDATE database
const updateEmployee = require('../../SQLmodules/updateSQL/updateEmployee.js');
// DELETE database

const deleteEmp = require('../../SQLmodules/deleteSQL/mysqlDeleteEmp.js');
// callback to start
const callbackQuery = require('../../globalFunctions/callbackQuery.js')

// this is where we call-back to, after we've collected our data, now we're looping over each edit.
function updEmpLooper(empObj, promptObj) {
    // handly table for user 
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

    // first ask WHAT element of employee to edit
    inquirer.prompt([{
        name: 'editChoice',
        type: 'list',
        message: 'Which employee element would you like to edit?',
        choices: ['First Name', 'Last Name', 'Manager', 'Title', 'Submit', 'Cancel', 'DELETE EMPLOYEE']
    }]).then((res) => {
        // switch for each thing, each wiil require an inquire
        switch(res.editChoice) {
            
            // first and last name just require an INPUT
            case 'First Name':
                inquirer.prompt([{
                    name: 'fName',
                    type: 'input',
                    message: 'What do you want the FIRST NAME to be:'
                },
                    contPrompt
                ]).then((res) => {
                    empObj.fName = res.fName;
                    if (res.continue) {
                        updEmpLooper(empObj, promptObj);
                    } else {
                        console.log(`Sent employee UPDATOR!`)
                        updateEmployee(empObj).then(() => {
                            // cb query here
                            callbackQuery();
                        });
                    }
                });
                break;

            case 'Last Name':
                inquirer.prompt([{
                    name: 'lName',
                    type: 'input',
                    message: 'What do you want the LAST NAME to be:'
                },
                    contPrompt
                ]).then((res) => {
                    empObj.lName = res.lName
                    if (res.continue) {
                        updEmpLooper(empObj, promptObj);
                    } else {
                        console.log("Sent to UPDATE!");
                        updateEmployee(empObj).then(() => {
                            // cb query here
                            callbackQuery();
                        });
                    }
                })
                break;
            
            // manager and roles both require lists of available.
            case 'Manager':
                inquirer.prompt([{
                    name: 'manager',
                    type: 'list',
                    message: 'Which MANAGER should be assigned to this employee:',
                    choices: promptObj.managers
                },
                    contPrompt
                ]).then((res) => {
                    empObj.manID = promptObj.managers.indexOf(res.manager) + 1;
                    if (res.continue) {
                        updEmpLooper(empObj, promptObj);
                    } else {
                        console.log("Sent to UPDATE!");
                        updateEmployee(empObj).then(() => {
                            // cb query here
                            callbackQuery();
                        });
                    }
                })
                break;

            case 'Title':
                inquirer.prompt([{
                    name: 'title',
                    type: 'list',
                    message: 'Which TITLE should be assigned to this employee:',
                    choices: promptObj.titles
                },
                    contPrompt
                ]).then((res) => {
                    empObj.roleID = promptObj.titles.indexOf(res.title) + 1;
                    if (res.continue) {
                        updEmpLooper(empObj, promptObj);
                    } else {
                        console.log("Sent to UPDATE!");
                        updateEmployee(empObj).then(() => {
                            // cb query here
                            callbackQuery();
                        });
                    }
                })
                break;
            case 'Submit': 
                updateEmployee(empObj).then(() => {
                    // cb query here
                    callbackQuery();
                });
                break;
            
            case 'DELETE EMPLOYEE':
                inquirer.prompt({
                    name: 'reConf',
                    type: 'input',
                    message: 'Are you sure you want to PERMENANTLY DELETE this employee? Type "DELETE" to permenantly DELETE!'
                }).then((res) => {
                    if (res.reConf === 'DELETE') {
                        deleteEmp(empObj.id).then(() => {
                            // cb query here
                            callbackQuery();
                        });
                    } else {
                        console.log("Delete Canceled").then(() => {
                            // cb query here
                            callbackQuery();
                        });
                    }
                })

                break;

            default:
                console.log("Process Ended.")
                break;
        }
    })
}

module.exports = updEmpLooper;