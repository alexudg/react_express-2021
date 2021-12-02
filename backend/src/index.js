const express = require('express');
const morgan = require('morgan'); // methods request
const usersRouters = require('./routes/users.routes');
app = express();
app.use(morgan('dev'));
app.use(usersRouters)
const port = '4000';
app.listen(
    port, 
    () => console.log(`server listen at port: ${port}`),
);