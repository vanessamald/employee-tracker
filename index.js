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
//prompt();

// function to view all departments

// function to view all roles

// function to view all employees

// function to add a department

// function to add a role

// function to update an employee role
