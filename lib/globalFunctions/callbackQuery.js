// this calls back to the start of the script IF the user wants to.
// npms
const inquirer = require('inquirer');


function callbackQuery() {

    inquirer.prompt({
        name: 'callback',
        type: 'confirm',
        message: 'Do you wish to make another selection?'
    }).then((res) => {
        if (res.callback) {
            const initEmpMan = require('./employeeManagerCB.js');
            initEmpMan();
        } else {
            console.log("See you next time!");
        }
    })
}

module.exports = callbackQuery;