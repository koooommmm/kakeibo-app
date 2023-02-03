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

app.get("/items", (req, res) => {
  connection.execute("select * from item;", (err, results, fields) => {
    res.send(results);
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
