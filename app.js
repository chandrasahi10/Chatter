const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
const router = require('./routes/routes');

const db = mysql.createConnection({
  host:         process.env.DB_HOST,
  user:         process.env.DB_USER,
  password:     process.env.DB_PASSWORD,
  database:     process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.use('/',router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
