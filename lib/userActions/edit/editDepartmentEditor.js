// npms
const inquirer = require('inquirer');

// UPDATE sql
const {sqlUpdate, sqlDelete} = require('../../SQLmodules/mysqlActions.js')

// callback to start
const callbackQuery = require('../../globalFunctions/callbackQuery.js');

function updDepLooper(depObj) {

    console.log(`Current Department Name: ${depObj.department}`)
    
    const contPrompt = {
        name: 'continue',
        type: 'confirm',
        message: 'Do you want to EDIT something else about this department?'
    }

    let depTable = '';

    inquirer.prompt([{
        name: 'editChoice',
        type: 'list',
        message: 'What should be changed/done with this DEPARTMENT?',
        choices: ['Department Name', 'Submit', 'Cancel', 'DELETE DEPARTMENT']
    }]).then((res) => {
        switch(res.editChoice) {
            
            case 'Department Name':
                inquirer.prompt([{
                    name: 'name',
                    type: 'input',
                    message: 'What do you want the DEPARTMENT NAME to be:'
                },
                    contPrompt
                ]).then((res) => {
                    depObj.department = res.name;

                    if (res.continue) {
                        updDepLooper(depObj);
                    } else {
                        console.log(`Sent department to UPDATOR!`)
                        depTable = `departments
                        SET dep_name = "${depObj.department}"`
                        sqlUpdate(depTable, depObj.id).then(() => {
                            // cb query here
                            callbackQuery();
                        });
                    }
                });
                break;

            case 'Submit':
                console.log(`Sent department to UPDATOR!`)
                depTable = `departments
                SET dep_name = "${depObj.department}"`
                sqlUpdate(depTable, depObj.id).then(() => {
                    // cb query here
                    callbackQuery();
                });
                break;
                
            case 'DELETE DEPARTMENT':
                    inquirer.prompt({
                        name: 'reConf',
                        type: 'input',
                        message: 'Are you sure you want to PERMENANTLY DELETE this department? Type "DELETE" to permenantly DELETE!'
                    }).then((res) => {
                        if (res.reConf === 'DELETE') {
                            sqlDelete('departments', depObj.id).then(() => {
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
                console.log("Process Ended")
                
                callbackQuery();
                break;
        }
    });
}

module.exports = updDepLooper;