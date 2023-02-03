"use strict";

const express = require("express");
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "db",
  user: "kakeibo-user",
  password: "password",
  database: "kakeibo",
});

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();

app.get("/items/income", (req, res) => {
  connection.execute(
    "select id, category, date, name, price from items where kind='income';",
    (err, results, fields) => {
      console.log(results);
      res.send(results);
    }
  );
});

app.get("/items/expense", (req, res) => {
  connection.execute(
    "select id, category, date, name, price from items where kind='expense';",
    (err, results, fields) => {
      console.log(results);
      res.send(results);
    }
  );
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
