const mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "yathra"
});

connection.connect((err) => {
  if(err){
    return console.log(err.message);
  }
  console.log("Connected to mysql server");
});

module.exports = {connection};
