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
            "Add an employee",
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
    if ( userPrompt == 'Add an employee') {
        addEmployee();
    }
    if ( userPrompt == 'Update an employee role') {
        updateEmployee();
    }   
})};

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

// function to add a role (title, salary, department)
const addRole = () => {
    
    inquirer.prompt([
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
        const addNewRole = answer.addNewRole;
        const roleSalary = answer.newSalary;

        const sql = `SELECT * FROM departments`;
        connection.query(sql, (err, rows) => {
        
        const departments = rows.map(({department_name, id}) => ({name: department_name, value:id}));
      
        inquirer.prompt ([
        {
            name: 'departmentName',
            type: 'list',
            message: 'What department do you want to add the new role to?',
            choices: departments
            //validate:    
        }   
    ])
    .then((answer) => {
        // destructure object
        const { departmentName } = answer;
        const deptId = departmentName;
        console.log(departmentName);

        // array of parameters
        const roleData = [addNewRole, roleSalary, deptId];
        
        // connect to db and add new role
        const insertRole = `INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?)`;
        connection.query(insertRole, roleData, (rows) => {
            // let user know new role has been added 
            console.log('New role has been added!');
            //console.log(addNewRole, roleSalary, deptId);
            
            // print new roles table
            const newRoles = `SELECT * FROM roles`;
            connection.query(newRoles, (err, rows) => {
            console.table(rows);
                })}
            )})
        })   
    })    
};
// function to add an employee ********
// (first_name, last_name, role_id, manager_id)
const addEmployee = () => {
    inquirer.prompt ([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the first name of the new employee?'
            //validate: 
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the last name of the new employee?'
            //validate:
        }
    ])
    .then((answer) => {
        const firstName = answer.firstName;
        const lastName = answer.lastName;
        

        const sql = `SELECT * FROM roles`;
        connection.query(sql, (err, rows) => {
            const roles = rows.map(({title, id}) => ({name: title, value: id}));
            inquirer.prompt([
                {
                    name:'role',
                    type: 'list',
                    message: 'What is the role of the new employee?',
                    choices: roles
                }
            ])
            .then((answer) => {
                const roleId = answer.role;
               

                const sql = `SELECT * FROM employees`;
               
                connection.query(sql, (err, rows) => {
                const managers = rows.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}));
                //const managerList = managers.name;
                    inquirer.prompt([
                        {
                            name: 'manager',
                            type: 'list',
                            message: "Who is the new employee's manager?",
                            choices: managers
                        }
                    ])
                    .then((answer) => {
                        const { manager } = answer;
                        const newEmployee = [firstName, lastName, roleId, manager];
                        console.log(newEmployee);
                        const sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                            connection.query(sql, newEmployee, (err, rows) => {
                                if (err) {
                                    throw err;
                                }
                               console.log('New employee has been added');
                                
                            }) 
                    })
                })
            })
        })
    })

    




    const sql = `SELECT * FROM employees`;
    connection.query(sql, (err, rows) => {
        
    })
}









// function to update an employee role 
// (first_name, last_name, role_id, manager_id)********
const updateEmployee = () => {
    const sql = `SELECT * FROM employees`;
    connection.query(sql, (err, rows) => {
        const employees = rows.map(({first_name, last_name}));

        inquirer.prompt ([
            {
            name: 'employees',
            type: 'list',
            message: 'What employee would you like to update?',
            choices: employees
            //validate: ''
            }
        ])
        .then((answer) => {

        })
    })
}


module.exports = prompt;
