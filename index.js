const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

function prompt() {
    inquirer.prompt({
        type: 'checkbox',
        message: "What would you like to do?",
        name: 'actions',
        choices: [
            "View all departments",
            "View all roles",
            "View all employees", 
            "Add a department",
            "Add a role",
            "Update an employee role",
            "EXIT"
        ]
    })
}
prompt();
// view all departments
//view all roles
// view all employees
// add a department
// add a role
// update an employee role
