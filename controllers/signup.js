const mysql = require('mysql2');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();

const db = mysql.createConnection({
    host:         process.env.DB_HOST,
    user:         process.env.DB_USER,
    password:     process.env.DB_PASSWORD,
    database:     process.env.DB_NAME
  });


exports.viewSignUp = (req,res) =>{
    res.sendFile(path.join(__dirname,'../','views','signup.html'));
}

exports.viewLogin = (req,res) => {
    res.sendFile(path.join(__dirname,'../','views','login.html'))
}

exports.signup = (req, res) => {
    const { name, email, contact, password } = req.body;
  
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) throw err;
  
      const sql = 'INSERT INTO users (name, email, contact, password) VALUES (?, ?, ?, ?)';
      const values = [name, email, contact, hashedPassword];
  
      db.query(sql, values, (err, result) => {
        if (err) throw err;
        console.log('User registered successfully');
        res.redirect('/login'); 
      });
    });
  };