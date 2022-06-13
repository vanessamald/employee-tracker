INSERT INTO departments (department_name)
VALUES
  ('Management'),
  ('Sales'),
  ('Human Resources');

INSERT INTO employees (first_name, last_name, role_id)
VALUES
  ('Ronald', 'Firbank', 2),
  ('Virginia', 'Woolf', 1),
  ('Piers', 'Gaveston', 3),
  ('Charles', 'LeRoi', 4),
  ('Unica', 'Zurn', 4);

  INSERT INTO roles (title, salary, department_id)
  VALUES
  ("Manager", 100000.00, 1),
  ("Assistant Manager", 70000.00, 1),
  ("Sales Lead", 60000.00, 3),
  ("Customer Sales", 40000.00, 3),
  ("Human Resources Coordinator", 150000.00, 4);
