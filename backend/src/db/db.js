const sqlite3 = require('sqlite3').verbose();
require('../config');

//console.log(`env.DB_PATH: ${process.env.DB_PATH}`)

let db = new sqlite3.Database(
    process.env.DB_PATH, // file '.env' package 'dotenv'
    (err) => {
        if (err) {
            console.log(err.message);
        }
        console.log('db connected!');
    }
);

module.exports = db; 
  // db.close((err) => {
  //   if (err) {
  //     console.error(err.message);
  //   }
  //   console.log('Close the database connection.');
  // });