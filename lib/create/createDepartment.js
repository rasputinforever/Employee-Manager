// npms
const inquirer = require('inquirer');

//QUERY adding
const addDepartment = require('../insertSQL/mysqlAddDep.js')

// create new department
function createDep() {
    inquirer.prompt({
        message: 'What will this Department be called?',
        type: 'input',
        name: 'newDep'
    }).then((res) => {
        addDepartment(res.newDep);
    })
}

module.exports = createDep;