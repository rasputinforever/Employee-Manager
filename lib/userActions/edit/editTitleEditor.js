// npms
const inquirer = require('inquirer');

// required functions
const updateTitle = require('../../SQLmodules/updateSQL/updateTitle.js')
const callbackQuery = require('../../globalFunctions/callbackQuery.js')

function updTitlLooper(titlObj, promptObj) {
    // summarize
    console.table(`Summary for ${titlObj.title}`, 
    {
        Title: titlObj.title,
        Salary: titlObj.salary,
        Department: promptObj.deps[promptObj.depIDs.indexOf(titlObj.department_id)]
    })

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
        choices: ['Title Name', 'Salary', 'Department', 'Submit', 'Cancel', 'DELETE EMPLOYEE']
    }]).then((res) => {
        // switch for each thing, each wiil require an inquire
        switch(res.editChoice) {

            case 'Title Name':
                inquirer.prompt([{
                    name: 'name',
                    type: 'input',
                    message: 'What do you want the TITLE NAME to be:'
                },
                    contPrompt
                ]).then((res) => {
                    titlObj.title = res.name;

                    if (res.continue) {
                        updTitlLooper(titlObj, promptObj);
                    } else {
                        console.log(`Sent title to UPDATOR!`)
                        updateTitle(titlObj).then(() => {
                            // cb query here
                            callbackQuery();
                        });
                    }
                });

                break;
            case 'Salary':
                inquirer.prompt([{
                    name: 'salary',
                    type: 'input',
                    message: 'What do you want the SALARY to be:'
                },
                    contPrompt
                ]).then((res) => {
                    titlObj.salary = res.salary;

                    if (res.continue) {
                        updTitlLooper(titlObj, promptObj);
                    } else {
                        console.log(`Sent title to UPDATOR!`)
                        updateTitle(titlObj).then(() => {
                            // cb query here
                            callbackQuery();
                        });
                    }
                });
                break;
            case 'Department':
                inquirer.prompt([{
                    name: 'department',
                    type: 'list',
                    message: 'What do you want the DEPARTMENT to be:',
                    choices: promptObj.deps
                },
                    contPrompt
                ]).then((res) => {
                    // need to send ID, not NAME of dep: this is the solution
                    titlObj.department_id = promptObj.depIDs[promptObj.deps.indexOf(res.department)];

                    if (res.continue) {
                        updTitlLooper(titlObj, promptObj);
                    } else {
                        console.log(`Sent title to UPDATOR!`)
                        updateTitle(titlObj).then(() => {
                            // cb query here
                            callbackQuery();
                        });
                    }
                });
                break;
            case 'Submit':
                updateTitle(titlObj).then(() => {
                    // cb query here
                    callbackQuery();
                });
                break;

            case 'Cancel':
                console.log('Title UPDATOR cancelled!')
                callbackQuery();
                break;
            case 'DELETE TITLE':
                break;
            default:
                break;
                                                                                                                                                                
        }
    });
}

module.exports = updTitlLooper;