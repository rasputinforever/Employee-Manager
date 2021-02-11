// npms
const inquirer = require('inquirer');

// GET sql
const getDepartments = require('../../SQLmodules/getSQL/mysqlQueryDep.js');

// looper
const updDepLooper = require('./editDepartmentEditor.js')

function editDep() {
    // query up dep list
    getDepartments().then((depList) => {
        let deps = [];
        depList.forEach(dep => {
            deps.push(dep.department);
        });

        inquirer.prompt({
            name: 'selection',
            type: 'list',
            message: 'which DEPARTMENT should be edited?',
            choices: deps
        }).then((res) => {
            const selectedDep = depList.find(dep => dep.department === res.selection);
            updDepLooper(selectedDep);
        })
    })
}

module.exports = editDep;