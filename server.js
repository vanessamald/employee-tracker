// database connection
const connection = require('./db/connection');
const prompt = require('./index.js');

// add express
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// connect to database
connection.connect(err => {
    if(err) throw err;
    console.log('Connected to the database');
    
// connect to server 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // run inquirer
    prompt();
})
});
