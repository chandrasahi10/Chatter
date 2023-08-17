const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
const router = require('./routes/routes');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10 
  });


app.use('/',router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
