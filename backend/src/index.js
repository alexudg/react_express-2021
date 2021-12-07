const express = require('express');
const morgan = require('morgan'); // methods request
const cors = require('cors');
const usersRouters = require('./routes/users.routes');

app = express();
app.use(cors());
app.use(express.json()); // drive json
app.use(morgan('dev')); // method_request
app.use(usersRouters) // routes

/// listener Midleware of error used on controllers
app.use((err, req, res, next) => {    
    return res.json({
        success: false,
        message: err.message
    })
});

const port = '4000';
app.listen(
    port, 
    () => console.log(`server listen at port: ${port}`),
);