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
            "Update employee's manager",
            "EXIT",
            "Delete an employee",
            "Delete a department",
            "Delete a role"
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
    if ( userPrompt == 'EXIT') {
        process.exit();
    }
    if ( userPrompt == 'Delete an employee') {
        deleteEmployee();
    }
    if ( userPrompt == "Update employee's manager") {
        updateManager();
    }
    if ( userPrompt == "Delete a department") {
        deleteDept();
    }  
    if ( userPrompt == "Delete a role") {
    deleteRole();
}       
})};

// function to view all departments  
const viewAllDepartments = () => {
    console.log('VIEWING DEPARTMENTS');

    const departmentData = `SELECT * FROM departments`;
    connection.query(departmentData, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows);
        return prompt();
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
    
    const allEmployees = `SELECT * FROM employees`;
    connection.query(allEmployees, (err, rows) => {
        if (err) {
            throw err;
        }
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
            
            return prompt();
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
            
            return prompt();
                })}
            )})
        })   
    })    
};

// function to add an employee 
// (first_name, last_name, role_id, manager_id)
const addEmployee = () => {
    inquirer.prompt ([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the first name of the new employee?',
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the last name of the new employee?',
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
                            console.log('New employee has been added!');
                            viewAllEmployees();
                        }) 
                    })
                })
            })
        })
    })
};

// function to update an employee role 
// (first_name, last_name, role_id, manager_id)********
const updateEmployee = () => {
    const sql = `SELECT * FROM employees`;
    connection.query(sql, (err, rows) => {
        const employees = rows.map(({first_name, last_name, id}) => ({name: `${first_name}, ${last_name}`, value: id}));

        inquirer.prompt ([
            {
            name: 'employee',
            type: 'list',
            message: 'What employee would you like to update?',
            choices: employees
            }
        ])
        .then((answer) => {
            const { employee } = answer;
            const sql = `SELECT title, id FROM roles`;
            connection.query(sql, (err, rows) => {
                const roles = rows.map(({title, id}) => ({name: title, value: id}));
                inquirer.prompt([
                    {
                        name: 'newRole',
                        type: 'list',
                        message: 'What is the new role of the employee?',
                        choices: roles
                    }
                ])
                .then((answer) => {
                    const { newRole } = answer;
                    const employeeRole = [newRole, employee];

                    console.log(employeeRole);
                    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
                    connection.query(sql, employeeRole, (err, rows) => {
                        if (err) {
                            throw err;
                        }
                        console.log('Employee has been updated!');
                        viewAllEmployees();
                    })
                })
            })
        })
    })
};

// function to remove an employee
const deleteEmployee = () => {
    const sql = `SELECT * FROM employees`;
    
    connection.query(sql, (err, rows) => {
        const employees = rows.map(({first_name, last_name, id}) => ({name: `${first_name}, ${last_name}`, value:id}));
        if (err)
        throw error;

        inquirer.prompt([
            {
                name: 'employee',
                type: 'checkbox',
                message: 'What employee do you want to delete?',
                choices: employees
            }
        ])
        .then((answer) => {
            const { employee } = answer;
            console.log(employee);
            const sql = `DELETE FROM employees WHERE id = ?`;
            connection.query(sql, employee, (rows) => {
                console.log('Employee has been deleted!');
                viewAllEmployees();
            })
        })
    })
};

// function to update employee's manager
const updateManager = () => {
    const sql = `SELECT * FROM employees`;

    connection.query(sql, (err, rows) => {
        const employees = rows.map(({first_name, last_name, id}) => ({name: `${first_name}, ${last_name}`, value: id}));
        inquirer.prompt([
            {
                name: 'employee',
                type: 'checkbox',
                message: "What employee's manager would you like to update?",
                choices: employees
            }
        ])
        .then((answer) => {
            const { employee } = answer;
            const sql = `SELECT first_name, last_name, id FROM employees`;
            
            connection.query(sql, (err, rows) => {
                const managers = rows.map(({first_name, last_name, id}) => ({name: `${first_name}, ${last_name}`, value: id}));
                inquirer.prompt([
                    {
                        name: 'manager',
                        type: 'checkbox',
                        message: 'Who is the new manager for the employee?',
                        choices: managers
                    }
                ])
                .then((answer) => {
                    const { manager } = answer;
                    //console.log(manager);
                    //console.log(employee);
                    const newManager = [manager, employee];

                    const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;

                    connection.query(sql, newManager, (err, rows) => {
                        console.log("The employee's manager has been updated!");
                        viewAllEmployees();
                    })
                })
            })
        })
    })
}

// function to delete department
const deleteDept = () => {
const sql = `SELECT * FROM departments`;
connection.query(sql, (err, rows) => {
    if (err) {
        throw err;
    }

const dept = rows.map(({department_name, id}) => ({name: department_name, value: id}));
inquirer.prompt([
    {
        type: 'checkbox',
        name: 'department',
        message: 'Which department would you like to delete?',
        choices: dept 
    }
])
.then((answer) => {
    const { department } = answer;
    //console.log(department);
    const sql = `DELETE FROM departments WHERE id = ?`;
        connection.query(sql, department, (err, rows) => {
            if (err) {
                throw err;
            }
            console.log('Department has been deleted!');
            viewAllDepartments();
            })
        })
    }) 
}
// function to delete a role
const deleteRole = () => {
    const sql = `SELECT * FROM roles`;
    connection.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
    
    const roles = rows.map(({title, id}) => ({name: title, value: id}));
    inquirer.prompt([
        {
            type: 'checkbox',
            name: 'deleteRole',
            message: 'Which role would you like to delete?',
            choices: roles 
        }
    ])
    .then((answer) => {
        const { deleteRole } = answer;
        console.log(deleteRole);
        const sql = `DELETE FROM roles WHERE id = ?`;
            connection.query(sql, deleteRole, (err, rows) => {
                if (err) {
                    throw err;
                }
                console.log('The role has been deleted!');
                viewAllRoles();
                })
            })
        }) 
    }



module.exports = prompt;
