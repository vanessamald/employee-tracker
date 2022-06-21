# Employee Tracker
## Description
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria
A command line application with the following functionality:
- WHEN starting the application a prompt accepts user input 
- THEN I am able to choose from the following options: view all departments, view all roles, view all employees, add a department, add a role, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
- THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
- THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role
- THEN I am prompted to select an employee to update and their new role and this information is updated in the database

Bonus functionality:
- Ability to delete a department, employee or role


## Installation
    npm install mysql2 
<br/>

    npm install inquirer 
    
<br/>

    npm install console.table --save
    
<br/>

    npm install dotenv --save

<br/>

## Usage
    source db/db.sql
<br/>

    source db/schema.sql
<br/>

    source db/seeds.sql
<br/>



https://user-images.githubusercontent.com/100331647/174822296-6ee9d60a-d44d-4861-9499-33f37f0492a6.mov



<a href="https://drive.google.com/file/d/1XEaI6VesfpRmaOc4e6s_wN9UNL9kp8Xn/view?usp=sharing">Click here for full video</a>

    
## License 
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
