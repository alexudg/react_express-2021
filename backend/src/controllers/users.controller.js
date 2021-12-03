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

function queryAllSql(sql, res, next) {
    let rows = [];     
    db.serialize(() => {
        db.each(
            /// sql
            sql,
            /// callback for each row
            (err, row) => {
                if (err) {
                    //console.error(`err each: ${err.message}`);

                    /// send error at index.js middleware use(err,req,res,next)
                    next(err);
                }
                //console.log(row);

                rows.push(row);                
            },
            /// result complete 
            (err, count) => {
                if (err) {
                    //console.log(`err complete: ${err.message}`);                    
                    
                    /// send error at index.js middleware use(err,req,res,next)
                    next(err);
                }
                //console.log(rows);                
                
                res.send(rows);
            }
        ); // each        
    }); // serialize       
}

function queryOneSql(sql, res, next) {
    db.get(sql, (err, row) => {
        if (err) {
            console.log(err.message);

            /// send error at index.js middleware use(err,req,res,next)
            next(err);             
        }
        console.log(row); // {...}|indefined
        if (row)
            res.send(row);
        else
            res.send([]);
    })
}

function executeSql(sql, res, next) {
    db.exec(sql, (err) => {
        if (err) {
            //console.log(err.message); 

            /// send error at index.js middleware use(err,req,res,next)
            next(err);           
        } else {
            res.send({ success: true })
        }        
        
    });   
}

const getAllUsers = (req, res, next) => {
    const sql = `SELECT id, userName, email, age, height
                 FROM users
                 ORDER BY userName`;
    queryAllSql(sql, res, next);    
}

/// req.params['id']
const getUser = (req, res, next) => {
    const id = req.params['id'];
    const sql = `SELECT id, userName, email, age, height
                FROM users
                WHERE id = ${id}`;
    queryOneSql(sql, res, next);    
}

/// { userName: 'peter', email: 'peter@mail.com', age: 55, height: 1.63 }
const insertUser = (req, res, next) => {
    //console.log(req.body); // require use(express.json())
    const user = req.body;
    const sql = `INSERT INTO users (userName, email, age, height)
                 VALUES ("${user['userName']}", "${user['email']}", ${user['age']}, ${user['height']})`;
    executeSql(sql, res, next);                 
}

const updateUser = (req, res, next) => {
    const user = req.body;
    const sql = `UPDATE users SET 
                    userName = "${user['userName']}",
                    email = "${user['email']}",
                    age = ${user['age']},
                    height = ${user['height']}
                WHERE id = ${user.id}`;
    executeSql(sql, res, next);
}

const deleteUser = (req, res, next) => {
    const id = req.params['id'];
    const sql = `DELETE FROM users WHERE id = ${id}`;
    executeSql(sql, res, next);
}

module.exports = {
    getAllUsers,
    getUser,
    insertUser,
    updateUser,
    deleteUser
};