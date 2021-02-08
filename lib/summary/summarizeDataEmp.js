// npms
const inquirer = require('inquirer');
const cTable = require('console.table');

// modules
const getAllQuery = require('../mysqlQuery.js')

// summarizes all employees. Conveniently, the query is just that.
function empSummary() {
    getAllQuery().then((data) => {
        console.table(`Summary of Employees`, data);
    })
}

module.exports = empSummary;