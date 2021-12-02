const db = require('../db/db');

class User {
    id;
    userName;
    age;
    height;

    constructor(id, userName, age, height) {
        this.id = id;
        this.userName = userName;
        this.age = age;
        this.height = height;
    }
}

const getAllUsers = async (req, res) => {
    var users = [];
    db.serialize(() => {
        db.each(
            /// sql
           `SELECT id, userName, email, age, height
            FROM users
            ORDER BY userName`,
            /// callback for each row
            (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                //console.log(row);
                const user = new User(
                    row['id'],
                    row['userName'],
                    row['age'],
                    row['height']
                );
                //console.log(user);
                users.push(row);
                //console.log(`users into each: ${users}`);
            },
            /// sql complete 
            (err, count) => {
                if (err) {
                    console.log(err.message);                    
                }
                res.send(users);
            }
        ); // each        
    }); // serialize         
}

module.exports = {
    getAllUsers
};