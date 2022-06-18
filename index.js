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
        viewAllRoles();
    }

    if ( userPrompt == 'View all employees') {
        console.log('PROMPT WORKS');
        viewAllEmployees();
    }

    if ( userPrompt == 'Add a department') {
        addDepartment();
    }
    if ( userPrompt == 'Add a role') {
        addRole();
    }
    })
};

// function to view all departments  
const viewAllDepartments = () => {
    console.log('VIEWING DEPARTMENTS')

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
    connection.query(roleData, (err, rows) => {
    if (err) {
        throw err;
    }
    console.table(rows);
    return prompt();
    })
};

// function to view all employees 
const viewAllEmployees = () => {
    console.log('HELLO');
    
    const allEmployees = `SELECT * FROM employees`;
    connection.query(allEmployees, (err, rows) => {
        //if (err) {
            //throw err;
        //}
        console.table(rows);
        return prompt();
    })  
};

// function to add a department 
const addDepartment = () => {
    console.log('ADDING DEPARTMENT');
    inquirer.prompt([
        {
        name: 'addDepartment',
        type: 'input',
        message: 'What is the name of the new Department?'
        //validate: 
        }
    ])
    .then((answer) => {
        const department = `INSERT INTO departments (department_name) VALUES (?)`;
        console.log(answer.addDepartment);

        connection.query(department, answer.addDepartment, (err, rows) => {
            const departments = `SELECT * FROM departments`;
            connection.query(departments, (err, rows) => {

            console.table(rows);
            console.log('New department has been added!');
            
            prompt();
            })
        })   
    })    
};

// function to add a role **********
// title, salary, department
const addRole = () => {
    //const departmentsArray = [];
    inquirer.prompt([
        
        {
        name: 'departmentName',
        type: 'checkbox',
        message: 'What department do you want to add the new role to?',
        choices: ''
        //validate:
        },
        
        {
            name: 'addNewRole',
            type: 'input',
            message: 'What is the name of the new role?'
            //validate:
        },
        {
           name: 'newSalary',
           type: 'input',
           message: 'What is the salary for the new role?' 
        }
    ])
    .then((answer) => {
        const departmentName = answer.departmentName;
        // add the dept id HERE 

        
        const addNewRole = answer.addNewRole;
        const roleSalary = answer.newSalary;

        const insertRole = `INSERT INTO roles(title, salary, id) VALUES (?, ?, ?)`;
        
        connection.query(insertRole, addNewRole, roleSalary, (rows) => {

        return insertRole;
        viewAllRoles();
        })
    })
};


// function to update an employee role


module.exports = prompt;
