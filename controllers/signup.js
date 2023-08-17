const mysql = require('mysql2/promise');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10 
  });

exports.viewSignUp = (req,res) =>{
    res.sendFile(path.join(__dirname,'../','views','signup.html'));
}

exports.viewLogin = (req,res) => {
    res.sendFile(path.join(__dirname,'../','views','login.html'))
}


exports.signup = async (req, res) => {
    try {
      const { name, email, contact, password } = req.body;
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const selectSql = 'SELECT * FROM users WHERE email = ?';
      const [selectResult] = await pool.query(selectSql, [email]);
  
      if (selectResult.length > 0) {
        const script1 = `<script>
        alert('User already exists. Please try again');
        window.location.href = '/signup'
        </script>`;
        return res.send(script1);
      }
  
      const insertSql = 'INSERT INTO users (name, email, contact, password) VALUES (?, ?, ?, ?)';
      const values = [name, email, contact, hashedPassword];
  
      await pool.query(insertSql, values);
  
      console.log('User registered successfully');
      
      const script2 = `
        <script>
          alert('Sign-Up successful. Please login to continue.');
          window.location.href = '/login'
        </script>`;
      res.send(script2);
    } catch (err) {
      console.error('Error during signup:', err);
      res.status(500).send('Internal Server Error');
    }
  };
  
