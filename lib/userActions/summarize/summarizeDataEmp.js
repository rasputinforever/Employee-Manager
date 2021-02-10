// npms
const cTable = require('console.table');

// modules
const getAllQuery = require('../../SQLmodules/getSQL/mysqlQuery.js')


const callbackQuery = require('../../globalFunctions/callbackQuery.js')

// summarizes all employees. Conveniently, the query is just that.
function empSummary() {
    getAllQuery().then((data) => {
        console.table(`Summary of Employees`, data)
        ;
    }).then(() => {
        // cb query here
        callbackQuery();
    });
}

module.exports = empSummary;