const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./data.db');

db.serialize(()=>{

  db.run(`CREATE TABLE IF NOT EXISTS admins(
    id INTEGER PRIMARY KEY,
    email TEXT,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY,
    name TEXT,
    price INT,
    img TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS settings(
    key TEXT,
    value TEXT
  )`);

});

module.exports=db;
