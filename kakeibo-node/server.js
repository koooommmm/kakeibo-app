"use strict";

const express = require("express");
const mysql = require("mysql2/promise");

const main = async () => {
  // Constants
  const PORT = 8080;
  const HOST = "0.0.0.0";

  // App
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });

  // create the connection to database
  const connection = await mysql.createConnection({
    host: "db",
    user: "kakeibo-user",
    password: "password",
    database: "kakeibo",
  });

  // API
  try {
    app.get("/items/income", async (req, res) => {
      const [results, fields] = await connection.execute(
        "select id, category, date, name, price from items where kind='income' and delete_flag=0;"
      );
      res.send(results);
    });

    app.get("/items/expense", async (req, res) => {
      const [results, fields] = await connection.execute(
        "select id, category, date, name, price from items where kind='expense' and delete_flag=0;"
      );
      res.send(results);
    });

    app.post("/items", async (req, res) => {
      const [results, fields] = await connection.execute(
        "insert into items (kind, category, date, name, price) values (?,?,?,?,?)",
        [
          req.body.kind,
          req.body.category,
          req.body.date,
          req.body.name,
          req.body.price,
        ]
      );
      res.send(results);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

main();
