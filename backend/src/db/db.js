const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(
    './src/db/database.db', 
    (err) => {
        if (err) {
            console.log(err.message);
        }
        console.log('db connected!');
    }
);

module.exports = db;

/*
db.serialize(() => {
    db.each(`SELECT PlaylistId as id,
                    Name as name
             FROM playlists`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    });
  });
  
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
*/