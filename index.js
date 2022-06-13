const connection = require('./db/connection');
// inquirer, mysql, and console table packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

function prompt() {
    inquirer.prompt([
        {
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
    }

])


.then(answers => {
    const userPrompt = answers.actions;
    if ( userPrompt == 'View all departments' ) {
        viewAllDepartments();
        }

    if ( userPrompt == 'View all roles') {
        //viewAllroles();
    }

    if ( userPrompt == 'View all employees') {
        console.log('PROMPT WORKS');
        viewAllEmployees();
    }
    })
};

const viewAllDepartments = () => {
    const departmentData = `SELECT * FROM departments`;
    connection.query(departmentData, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows);
    })
    
};

// function to view all roles
const viewAllRoles = () => {
    const roleData = `SELECT * FROM roles`;
};

// function to view all employees
const viewAllEmployees = () => {
    console.log('HELLO');
    
    const allEmployees = `SELECT * FROM employees`;
    connection.query(allEmployees, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log("\n");
        console.table(rows);
        return prompt();
    })
    
}

// function to add a department

// function to add a role

// function to update an employee role


module.exports = prompt;
