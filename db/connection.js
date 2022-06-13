const mysql = require('mysql2');

require('dotenv').config({ override: true })

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME

    },
    //console.log("Connected to the database")
);
module.exports = connection;