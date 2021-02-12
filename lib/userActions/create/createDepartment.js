// npms
const inquirer = require('inquirer');

//QUERY adding
const sqlInsert = require('../../SQLmodules/insertSQL/mysqlAdd.js')

// create new department
function createDep() {
    inquirer.prompt({
        message: 'What will this Department be called?',
        type: 'input',
        name: 'newDep'
    }).then((res) => {
        const depInsert = `departments (dep_name)
        VALUES ("${res.newDep}")`
        sqlInsert(depInsert).then(() => {
            // cb query here
            const callbackQuery = require('../../globalFunctions/callbackQuery.js')
            callbackQuery();
        })
    })
}

module.exports = createDep;