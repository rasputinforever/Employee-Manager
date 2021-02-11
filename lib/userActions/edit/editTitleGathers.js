// npms
const inquirer = require('inquirer');

// GET sql
const getTitles = require('../../SQLmodules/getSQL/mysqlQueryTitle.js')
const getDepartments = require('../../SQLmodules/getSQL/mysqlQueryDep.js')

// next function in chain
const updTitlLooper = require('./editTitleEditor.js')

function editTitl() {
    // GET all TITLE stuff we need to update:
    
    // getTitles
    getTitles().then((titlList) => {
        getDepartments().then((depList) => {
            // build arr of titles
            let titles = [];
            let titleIDs = [];
            titlList.forEach(title => {
                titles.push(title.title);
                titleIDs.push(title.id);
            });

            let deps = [];
            let depIDs = [];
            depList.forEach(dep => {
                deps.push(dep.department);
                depIDs.push(dep.id);
            });

            const promptObj = {
                titles: titles,
                titleIDs: titleIDs,
                deps: deps,
                depIDs: depIDs
            };
            // ask which title we want to edit, then goto editor CB looper
            inquirer.prompt({
                name: 'selection',
                type: 'list',
                message: 'Which TITLE should be edited?',
                choices: promptObj.titles
            }).then((res) => {
                const selectedTitle = titlList.find(title => title.title === res.selection);
                updTitlLooper(selectedTitle, promptObj);
            })
        })
    })
}

module.exports = editTitl;